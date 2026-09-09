import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="page gate">
        <p className="muted">Abrindo a casa de estudo…</p>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/entrar" replace state={{ from: location.pathname }} />
  }

  return children
}
