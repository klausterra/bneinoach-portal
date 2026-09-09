import {
  GoogleAuthProvider,
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isAdminEmail } from '../lib/admins'
import { auth, isFirebaseConfigured } from '../lib/firebase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false)
      return undefined
    }

    return onAuthStateChanged(auth, (next) => {
      setUser(next)
      setLoading(false)
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      configured: isFirebaseConfigured,
      isAdmin: isAdminEmail(user?.email),
      signInGoogle: async () => {
        setError('')
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        await setPersistence(auth, browserLocalPersistence)
        await signInWithPopup(auth, provider)
      },
      logout: async () => {
        setError('')
        await signOut(auth)
      },
      setError,
    }),
    [user, loading, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth precisa estar dentro de AuthProvider')
  }
  return context
}
