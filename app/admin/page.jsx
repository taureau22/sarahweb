'use client'

import { useState, useEffect, useCallback } from 'react'
import { Icon } from '@/components/icons'
import OrdersAdmin from '@/components/admin/OrdersAdmin'
import ProductsAdmin from '@/components/admin/ProductsAdmin'

const PW_KEY = 'elif_admin_pw'

export default function AdminPage() {
  const [pw, setPw]             = useState('')
  const [authed, setAuthed]     = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab]           = useState('products')

  const authHeader = useCallback(() => ({ 'x-admin-password': sessionStorage.getItem(PW_KEY) || '' }), [])
  const onUnauthorized = useCallback(() => { sessionStorage.removeItem(PW_KEY); setAuthed(false) }, [])

  useEffect(() => { if (sessionStorage.getItem(PW_KEY)) setAuthed(true) }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthError('')
    try {
      const res = await fetch('/api/admin/orders', { headers: { 'x-admin-password': pw } })
      if (res.ok) {
        sessionStorage.setItem(PW_KEY, pw)
        setAuthed(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setAuthError(data.error || 'Mot de passe incorrect.')
      }
    } catch {
      setAuthError('Serveur injoignable.')
    }
  }

  const logout = () => { sessionStorage.removeItem(PW_KEY); setAuthed(false); setPw('') }

  /* ---------- Connexion ---------- */
  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-5">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-surface border border-border rounded-4xl p-8 shadow-card">
          <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-terra-2 to-terracotta text-white flex items-center justify-center shadow-terra mb-5">
            <Icon.ShieldCheck className="w-6 h-6" />
          </span>
          <h1 className="font-display font-semibold text-ink text-2xl mb-1">Espace admin</h1>
          <p className="text-muted text-sm mb-6">Le Panier d&apos;Elif — commandes &amp; produits.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Mot de passe"
            autoFocus
            className="w-full h-12 px-4 rounded-2xl bg-bg border border-border text-ink focus:outline-none focus:border-terracotta transition-colors"
          />
          {authError && <p className="text-terracotta text-sm mt-2">{authError}</p>}
          <button className="mt-4 w-full h-12 rounded-full bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors">
            Se connecter
          </button>
        </form>
      </div>
    )
  }

  /* ---------- Dashboard ---------- */
  const TABS = [
    { id: 'orders',   label: 'Commandes', Ico: Icon.Package },
    { id: 'products', label: 'Produits',  Ico: Icon.ChefHat },
  ]

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <span className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-terra-2 to-terracotta text-white flex items-center justify-center shrink-0">
              <Icon.ChefHat className="w-5 h-5" strokeWidth={2} />
            </span>
            <span className="font-display font-semibold text-ink truncate">Admin</span>
          </span>

          <nav className="flex items-center gap-1 bg-bg rounded-full p-1 border border-border">
            {TABS.map(({ id, label, Ico }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-sm font-medium transition-colors ${
                  tab === id ? 'bg-ink text-white' : 'text-ink-2 hover:text-terracotta'
                }`}
              >
                <Ico className="w-4 h-4" /> <span className="hidden xs:inline">{label}</span>
              </button>
            ))}
          </nav>

          <button onClick={logout} className="text-sm text-muted hover:text-terracotta transition-colors inline-flex items-center gap-1.5 shrink-0">
            <Icon.X className="w-4 h-4" /> <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-8">
        {tab === 'orders'
          ? <OrdersAdmin authHeader={authHeader} onUnauthorized={onUnauthorized} />
          : <ProductsAdmin authHeader={authHeader} onUnauthorized={onUnauthorized} />}
      </div>
    </div>
  )
}
