import { useState } from 'react'
import './App.css'

const LAWS = [
  {
    he: 'עבודה זרה',
    title: 'Idolatria',
    text: 'Reconhecer um único Criador. Não servir imagens, deuses, forças da natureza nem qualquer mediador como se fosse Deus.',
  },
  {
    he: 'ברכת השם',
    title: 'Blasfêmia',
    text: 'Guardar o Nome. Não amaldiçoar o Criador nem tratar o sagrado com desprezo.',
  },
  {
    he: 'שפיכות דמים',
    title: 'Assassinato',
    text: 'A vida humana é inviolável. Quem derrama sangue destrói uma imagem do Criador.',
  },
  {
    he: 'גזל',
    title: 'Roubo',
    text: 'Não tomar o que é do outro — dinheiro, tempo, confiança, propriedade intelectual ou fraude.',
  },
  {
    he: 'גילוי עריות',
    title: 'Imoralidade sexual',
    text: 'Fronteiras claras nas relações: adultério, incesto e as uniões proibidas pela tradição noética.',
  },
  {
    he: 'אבר מן החי',
    title: 'Membro de animal vivo',
    text: 'Não comer carne retirada de um animal ainda vivo. A lei exige respeito à criatura, não só ao homem.',
  },
  {
    he: 'דינים',
    title: 'Tribunais de justiça',
    text: 'Instituir leis justas, julgar com imparcialidade e impedir que as outras seis leis fiquem só no papel.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Conhecer a aliança',
    text: 'Estudar que as sete leis não são “ética genérica”: são mandamentos dados ao mundo depois do dilúvio e reiterados no Sinai.',
  },
  {
    n: '02',
    title: 'Aceitar e praticar',
    text: 'Segundo o Rambam, o filho de Noé se torna piedoso das nações quando observa as leis porque Deus as ordenou a Moisés — não só por conveniência social.',
  },
  {
    n: '03',
    title: 'Viver em comunidade',
    text: 'Estudo regular, correção mútua e, quando houver, declaração formal (kabbalat mitzvot) diante de um beit din que reconheça o caminho noético.',
  },
]

const SOURCES = [
  {
    ref: 'Gênesis 9:1–17',
    text: 'Depois do dilúvio, Deus abençoa Noé e seus filhos, estabelece o arco-íris como sinal e proíbe o derramamento de sangue. É o texto-raiz da aliança com toda a humanidade.',
  },
  {
    ref: 'Gênesis 2:16',
    text: 'O Talmud lê o primeiro comando a Adão como semente das leis noéticas: autoridade divina, limites sobre o que se come e responsabilidade moral.',
  },
  {
    ref: 'Sanhedrin 56a–60b',
    text: 'A Guemará enumera as Sheva Mitzvot Bnei Noach, discute detalhes e distingue o que vale para Israel e o que vale para as nações.',
  },
  {
    ref: 'Rambam, Hilchot Melachim 8–9',
    text: 'Maimônides define quem é chassid umot haolam, o mérito da vida no Mundo Vindouro e o conteúdo prático de cada uma das sete leis.',
  },
  {
    ref: 'Tosefta Avodah Zarah 8:4',
    text: 'Fonte tannaítica paralela: as nações foram obrigadas nestes mandamentos, e os tribunais existem para sustentá-los.',
  },
  {
    ref: 'Gênesis 9:9',
    text: '“Eis que estabeleço a Minha aliança convosco e com vossa descendência.” A tradição lê aqui todos os filhos de Noé — isto é, todos os povos.',
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const onSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="page">
      <div className="sky" aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#topo" onClick={closeMenu}>
          <span className="brand-he">בני נח</span>
          <span className="brand-name">Bnei Noach</span>
        </a>
        <button
          className="menu-btn"
          type="button"
          aria-expanded={menuOpen}
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? 'links open' : 'links'}>
          <a href="#sobre" onClick={closeMenu}>O que é</a>
          <a href="#caminho" onClick={closeMenu}>O caminho</a>
          <a href="#leis" onClick={closeMenu}>Sete leis</a>
          <a href="#fontes" onClick={closeMenu}>Fontes</a>
          <a href="#estudos" onClick={closeMenu}>Estudos</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
        </nav>
      </header>

      <section className="hero" id="topo">
        <p className="eyebrow">Aliança com as nações</p>
        <h1>
          Filhos de Noé.
          <em> Uma ética para o mundo inteiro.</em>
        </h1>
        <p className="lead">
          Bnei Noach não é conversão ao judaísmo. É o caminho das nações:
          viver as sete leis dadas a Noé, com o Criador, a justiça e a
          vida no centro.
        </p>
        <div className="hero-actions">
          <a className="btn gold" href="#caminho">O que é preciso</a>
          <a className="btn ghost" href="#fontes">Ver as fontes</a>
        </div>
        <p className="verse">
          “Estabeleço a Minha aliança convosco e com vossa descendência.”
          <cite>Gênesis 9:9</cite>
        </p>
      </section>

      <section className="panel" id="sobre">
        <div className="wrap">
          <p className="kicker">O que é</p>
          <h2>Quem são os Bnei Noach</h2>
          <div className="split">
            <div>
              <p>
                <strong>Bnei Noach</strong> (בני נח, “filhos de Noé”) são
                não-judeus que reconhecem o Deus Uno e assumem as
                <em> Sheva Mitzvot Bnei Noach</em> — as sete leis noéticas.
              </p>
              <p>
                A tradição lê um primeiro núcleo já em Adão. Depois do
                dilúvio, a aliança é renovada com Noé e seus filhos, isto é,
                com toda a humanidade. No Sinai, Israel recebe 613
                mandamentos; as nações permanecem responsáveis pelas sete.
              </p>
              <p>
                Não se trata de um “judaísmo light”. É um pacto próprio:
                justiça, santidade da vida e recusa da idolatria, sem
                tomar sobre si o jugo de Israel.
              </p>
            </div>
            <aside className="quote">
              <p>
                Quem aceita as sete leis e as observa porque o Santo,
                bendito seja, as ordenou na Torá por meio de Moisés, esse
                é dos piedosos das nações do mundo, e tem parte no Mundo
                Vindouro.
              </p>
              <cite>Rambam, Hilchot Melachim 8:11</cite>
            </aside>
          </div>
        </div>
      </section>

      <section className="panel dusk" id="caminho">
        <div className="wrap">
          <p className="kicker">Como se torna</p>
          <h2>O que é preciso para ser Bnei Noach</h2>
          <ol className="steps">
            {STEPS.map((step) => (
              <li key={step.n}>
                <span className="num">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="panel" id="leis">
        <div className="wrap">
          <p className="kicker">Sheva Mitzvot</p>
          <h2>As sete leis de Noé</h2>
          <p className="intro">
            Sete pilares. O detalhe de cada um se estuda a vida inteira;
            o esqueleto é este.
          </p>
          <ol className="laws">
            {LAWS.map((law, index) => (
              <li key={law.title}>
                <span className="idx">0{index + 1}</span>
                <div>
                  <p className="he">{law.he}</p>
                  <h3>{law.title}</h3>
                  <p>{law.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="panel dusk" id="fontes">
        <div className="wrap">
          <p className="kicker">Textos</p>
          <h2>Onde a Torá e os sábios falam dos filhos de Noé</h2>
          <div className="sources">
            {SOURCES.map((source) => (
              <article key={source.ref}>
                <h3>{source.ref}</h3>
                <p>{source.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="panel" id="estudos">
        <div className="wrap narrow">
          <p className="kicker">Comunidade</p>
          <h2>Estudo, não espetáculo</h2>
          <p className="intro">
            Este portal começa como casa de estudo: textos, caminho e
            conversa. Sem marketing de conversão. Sem substituir um rav.
          </p>
          <ul className="offer">
            <li>Leitura guiada das sete leis e de Hilchot Melachim</li>
            <li>Círculo de perguntas sobre prática no dia a dia</li>
            <li>Mapa de fontes — Tanach, Talmud, midrash e Rishonim</li>
            <li>Acolhida de quem investiga o caminho sem pressa</li>
          </ul>
        </div>
      </section>

      <section className="panel dusk" id="contato">
        <div className="wrap narrow">
          <p className="kicker">Porta aberta</p>
          <h2>Escreva para o círculo</h2>
          {sent ? (
            <p className="thanks">
              Recebido. Respondemos com calma — estudo não se apressa.
            </p>
          ) : (
            <form className="form" onSubmit={onSubmit}>
              <label>
                Nome
                <input type="text" name="nome" required />
              </label>
              <label>
                Email
                <input type="email" name="email" required />
              </label>
              <label>
                Mensagem
                <textarea name="mensagem" rows="5" required />
              </label>
              <button className="btn gold" type="submit">
                Enviar
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="foot">
        <div className="wrap foot-row">
          <p>
            <span className="brand-he">בני נח</span>
            Portal de estudo Bnei Noach.
          </p>
          <p className="muted">© 2026 · Fontes no texto, não slogans.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
