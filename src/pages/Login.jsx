import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { user, loading, signInGoogle, configured } = useAuth()
  const location = useLocation()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const from = location.state?.from || '/app'

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  const onGoogle = async () => {
    setMessage('')
    setBusy(true)
    try {
      await signInGoogle()
    } catch (error) {
      const code = error?.code || ''
      if (code === 'auth/unauthorized-domain') {
        setMessage('Este domínio ainda não está autorizado no Firebase Hipercube.')
      } else if (code === 'auth/popup-closed-by-user') {
        setMessage('Janela do Google fechada. Tente de novo.')
      } else {
        setMessage('Não foi possível entrar. Tente novamente.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="page gate">
      <div className="sky" aria-hidden="true" />
      <div className="login-card">
        <p className="kicker">Comunidade</p>
        <h1>Entrar na casa de estudo</h1>
        <p className="lead">
          Login Google do projeto Firebase Hipercube. Admins:
          klausqterra@gmail.com e wanieleterra@gmail.com.
        </p>
        {!configured ? (
          <p className="error">Firebase não configurado neste ambiente.</p>
        ) : (
          <button className="btn gold" type="button" onClick={onGoogle} disabled={busy}>
            {busy ? 'Abrindo Google…' : 'Continuar com Google'}
          </button>
        )}
        {message ? <p className="error">{message}</p> : null}
        <Link className="back" to="/">Voltar à landing</Link>
      </div>
    </div>
  )
}
