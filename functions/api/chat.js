const SYSTEM_PROMPT = `Você é o guia do portal Bnei Noach (filhos de Noé).
Fale em português, com clareza e respeito.

Só responda sobre:
- o que é Bnei Noach e as sete leis (Sheva Mitzvot Bnei Noach)
- fontes: Gênesis 9, Sanhedrin 56a–60b, Rambam Hilchot Melachim 8–10
- como orar como filho de Noé (sem sidur de Israel, sem mediador, sem imagem)
- conselho ético alinhado às sete leis: idolatria, blasfêmia, assassinato, roubo, imoralidade sexual, ever min hachai, tribunais

Se o pedido sair desse círculo (política partidária, conversão ao judaísmo como atalho, magia, ódio, ou assunto alheio), recuse em uma frase e volte ao caminho noético.
Não invente halachá. Se não souber, diga para consultar um rav que reconheça Bnei Noach.
Não use o Nome inefável. Pode dizer Criador, Senhor, Hashem.
Ofereça modelos curtos de oração quando pedirem.`

const MAX_MESSAGES = 12
const MAX_CHARS = 2000

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

function b64url(bytes) {
  let str = ''
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes)
  arr.forEach((b) => {
    str += String.fromCharCode(b)
  })
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function b64urlJson(obj) {
  return b64url(new TextEncoder().encode(JSON.stringify(obj)))
}

function pemToBuffer(pem) {
  const b64 = pem.replace(/-----[\w\s]+-----/g, '').replace(/\s/g, '')
  const bin = atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i += 1) buf[i] = bin.charCodeAt(i)
  return buf.buffer
}

async function importPrivateKey(pem) {
  return crypto.subtle.importKey(
    'pkcs8',
    pemToBuffer(pem),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )
}

let cachedToken = { value: '', exp: 0 }

async function getVertexToken(sa) {
  const now = Math.floor(Date.now() / 1000)
  if (cachedToken.value && cachedToken.exp - 60 > now) return cachedToken.value

  const header = b64urlJson({ alg: 'RS256', typ: 'JWT' })
  const claim = b64urlJson({
    iss: sa.client_email,
    sub: sa.client_email,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  })
  const unsigned = `${header}.${claim}`
  const key = await importPrivateKey(sa.private_key)
  const sig = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned),
  )
  const jwt = `${unsigned}.${b64url(sig)}`
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  })
  const data = await res.json()
  if (!data.access_token) {
    throw new Error('Falha ao obter token Vertex')
  }
  cachedToken = { value: data.access_token, exp: now + 3300 }
  return data.access_token
}

async function verifyFirebase(idToken, apiKey) {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    },
  )
  const data = await res.json()
  return data.users?.[0] || null
}

function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .slice(-MAX_MESSAGES)
    .map((item) => {
      const role = item?.role === 'model' || item?.role === 'assistant' ? 'model' : 'user'
      const text = String(item?.content || item?.text || '').trim().slice(0, MAX_CHARS)
      return text ? { role, parts: [{ text }] } : null
    })
    .filter(Boolean)
}

export async function onRequestPost(context) {
  const { request, env } = context
  const apiKey = env.FIREBASE_WEB_API_KEY
  const saRaw = env.VERTEX_SERVICE_ACCOUNT
  const project = env.VERTEX_PROJECT || 'hipercube-500101'
  const location = env.VERTEX_LOCATION || 'us-central1'
  const model = env.VERTEX_MODEL || 'gemini-2.5-flash'

  if (!apiKey || !saRaw) {
    return json({ error: 'Chat não configurado neste ambiente.' }, 503)
  }

  const authHeader = request.headers.get('Authorization') || ''
  const idToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!idToken) return json({ error: 'Entre na comunidade para usar o guia.' }, 401)

  const user = await verifyFirebase(idToken, apiKey)
  if (!user) return json({ error: 'Sessão inválida. Entre de novo.' }, 401)

  let payload
  try {
    payload = await request.json()
  } catch {
    return json({ error: 'Pedido inválido.' }, 400)
  }

  const history = sanitizeMessages(payload.messages)
  if (!history.length) return json({ error: 'Escreva uma pergunta.' }, 400)

  let sa
  try {
    sa = JSON.parse(saRaw)
  } catch {
    return json({ error: 'Credencial Vertex inválida.' }, 500)
  }

  try {
    const token = await getVertexToken(sa)
    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${project}/locations/${location}/publishers/google/models/${model}:generateContent`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: history,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 900,
        },
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      return json({ error: 'O guia não pôde responder agora.' }, 502)
    }
    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n').trim()
    if (!text) return json({ error: 'Resposta vazia do guia.' }, 502)
    return json({ reply: text })
  } catch {
    return json({ error: 'Falha ao falar com o Vertex.' }, 502)
  }
}
