import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOKS, PRAYERS, PRAYER_GROUP, STUDIES, TABS } from '../content/community'
import { useAuth } from '../context/AuthContext'

export function Community() {
  const { user, isAdmin, logout } = useAuth()
  const [tab, setTab] = useState('estudos')

  return (
    <div className="page community">
      <div className="sky" aria-hidden="true" />
      <header className="nav">
        <Link className="brand" to="/">
          <span className="brand-he">בני נח</span>
          <span className="brand-name">Comunidade</span>
        </Link>
        <div className="user-box">
          {isAdmin ? <span className="badge">Admin</span> : null}
          <span className="user-mail">{user?.email}</span>
          <button className="btn ghost small" type="button" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </header>

      <div className="wrap community-head">
        <p className="kicker">Área interna</p>
        <h1>Casa de estudo e oração</h1>
        <p className="lead">
          {isAdmin
            ? 'Você entra como admin do círculo. Pode orientar grupos e textos.'
            : 'Bem-vindo. Aqui estão o grupo de estudos, o círculo de oração, os livros e os modelos.'}
        </p>
        <div className="tabs" role="tablist">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? 'tab on' : 'tab'}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <section className="panel dusk">
        <div className="wrap">
          {tab === 'estudos' ? (
            <>
              <h2>Grupo de estudos</h2>
              <div className="sources">
                {STUDIES.map((item) => (
                  <article key={item.title}>
                    <p className="num">{item.when}</p>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </>
          ) : null}

          {tab === 'oracao' ? (
            <>
              <h2>{PRAYER_GROUP.title}</h2>
              <p className="num">{PRAYER_GROUP.when}</p>
              <p>{PRAYER_GROUP.text}</p>
              <ul className="offer">
                {PRAYER_GROUP.parts.map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
            </>
          ) : null}

          {tab === 'livros' ? (
            <>
              <h2>Livros de oração e estudo</h2>
              <div className="sources">
                {BOOKS.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </>
          ) : null}

          {tab === 'exemplos' ? (
            <>
              <h2>Exemplos de oração</h2>
              <p className="intro">
                Modelos em português, sem fórmula mágica e sem copiar o
                ofício de Israel. Fale ao Criador com clareza.
              </p>
              <ol className="prayers">
                {PRAYERS.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </div>
      </section>
    </div>
  )
}
