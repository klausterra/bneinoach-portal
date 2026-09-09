import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const STARTERS = [
  'Como um Bnei Noach deve orar?',
  'Explique a lei de ever min hachai.',
  'Estou angustiado. Como pedir ao Criador sem copiar o sidur de Israel?',
]

export function ChatGuide() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, busy])

  const send = async (text) => {
    const content = (text || input).trim()
    if (!content || busy) return
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setBusy(true)
    setError('')
    try {
      const token = await user.getIdToken()
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Não foi possível responder.')
        return
      }
      setMessages([...next, { role: 'model', content: data.reply }])
    } catch {
      setError('Falha de rede com o guia.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="chat">
      <h2>Guia noético</h2>
      <p className="intro">
        IA no Vertex do Hipercube. Só fala de Bnei Noach, ensina a orar
        e aconselha no círculo das sete leis.
      </p>
      <div className="starters">
        {STARTERS.map((item) => (
          <button key={item} type="button" className="tab" onClick={() => send(item)}>
            {item}
          </button>
        ))}
      </div>
      <div className="chat-log" aria-live="polite">
        {messages.length === 0 ? (
          <p className="muted">Pergunte. O guia não sai do pacto de Noé.</p>
        ) : null}
        {messages.map((item, index) => (
          <article key={`${item.role}-${index}`} className={item.role === 'user' ? 'bubble me' : 'bubble'}>
            <p>{item.content}</p>
          </article>
        ))}
        {busy ? <p className="muted">O guia está pensando…</p> : null}
        <div ref={endRef} />
      </div>
      {error ? <p className="error">{error}</p> : null}
      <form
        className="chat-form"
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <label className="sr-only" htmlFor="chat-input">Mensagem</label>
        <textarea
          id="chat-input"
          rows="3"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Pergunte sobre as sete leis, oração ou um conselho…"
        />
        <button className="btn gold" type="submit" disabled={busy}>
          Enviar
        </button>
      </form>
    </div>
  )
}
