'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

const INITIAL = { prenom:'', nom:'', email:'', telephone:'', adresse:'', quartier:'', note:'' }

/* ===== Floating label input ===== */
function FloatInput({ id, name, type='text', label, value, onChange, error, autoComplete, required }) {
  return (
    <div>
      <div className="relative">
        <input
          id={id} name={name} type={type} value={value} onChange={onChange}
          autoComplete={autoComplete}
          required={required} aria-required={required}
          aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
          placeholder=" "
          className={`peer w-full bg-white border-2 rounded-2xl px-4 pt-7 pb-3 text-sm text-secondary focus:outline-none transition-colors ${
            error ? 'border-red-400 focus:border-red-400' : 'border-secondary/15 focus:border-primary'
          }`}
        />
        <label
          htmlFor={id}
          className="absolute left-4 top-5 text-sm text-text-light pointer-events-none transition-all duration-200 origin-left
            peer-focus:-translate-y-3 peer-focus:scale-[.78] peer-focus:text-primary
            peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-[.78] peer-[:not(:placeholder-shown)]:text-primary"
        >
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      </div>
      {error && <p id={`${id}-err`} role="alert" className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

/* ===== Floating label textarea ===== */
function FloatTextarea({ id, name, label, value, onChange, error, rows=3, autoComplete, required }) {
  return (
    <div>
      <div className="relative">
        <textarea
          id={id} name={name} value={value} onChange={onChange} rows={rows}
          autoComplete={autoComplete}
          required={required} aria-required={required}
          aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
          placeholder=" "
          className={`peer w-full bg-white border-2 rounded-2xl px-4 pt-7 pb-3 text-sm text-secondary focus:outline-none transition-colors resize-none ${
            error ? 'border-red-400' : 'border-secondary/15 focus:border-primary'
          }`}
        />
        <label
          htmlFor={id}
          className="absolute left-4 top-5 text-sm text-text-light pointer-events-none transition-all duration-200 origin-left
            peer-focus:-translate-y-3 peer-focus:scale-[.78] peer-focus:text-primary
            peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-[.78] peer-[:not(:placeholder-shown)]:text-primary"
        >
          {label}{required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      </div>
      {error && <p id={`${id}-err`} role="alert" className="text-red-500 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  )
}

export default function PanierPage() {
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [form,     setForm]     = useState(INITIAL)
  const [errors,   setErrors]   = useState({})
  const [loading,  setLoading]  = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.prenom.trim())    errs.prenom    = 'Prénom requis'
    if (!form.nom.trim())       errs.nom       = 'Nom requis'
    if (!form.email.trim())     errs.email     = 'Email requis'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide'
    if (!form.telephone.trim()) errs.telephone = 'Téléphone requis'
    if (!form.adresse.trim())   errs.adresse   = 'Adresse requise'
    if (!form.quartier.trim())  errs.quartier  = 'Quartier requis'
    return errs
  }

  const handlePay = async e => {
    e.preventDefault()
    setApiError('')
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      document.getElementById('form-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setLoading(true)
    try {
      const res  = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map(i => ({ id:i.id, name:i.name, price:i.price, quantity:i.quantity })), customer: form, totalAmount: totalPrice }),
      })
      const data = await res.json()
      if (data.success && data.paymentUrl) {
        sessionStorage.setItem('elif_last_order', JSON.stringify({ transactionId: data.transactionId, items, total: totalPrice, customer: form }))
        window.location.href = data.paymentUrl
      } else {
        setApiError(data.error || 'Erreur de paiement. Réessayez ou commandez via WhatsApp.')
        setLoading(false)
      }
    } catch {
      setApiError('Erreur réseau. Vérifiez votre connexion.')
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const WA   = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250758440009'
    const lines = items.map(i => `• ${i.shortName||i.name} × ${i.quantity} = ${formatPrice(i.price*i.quantity)}`).join('\n')
    const msg  = `Bonjour Le Panier d'Elif 🧆 !\n\nJe souhaite commander :\n\n${lines}\n\n*Total : ${formatPrice(totalPrice)}*\n\nMerci 🙏`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  /* ===== EMPTY ===== */
  if (!items.length) return (
    <div className="pt-[70px] min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center max-w-sm py-20">
        <div className="text-8xl mb-6" aria-hidden="true">🛒</div>
        <h1 className="font-cormorant font-bold text-secondary text-4xl mb-4">Panier vide</h1>
        <p className="text-text-light font-dm mb-8">Ajoutez des pastels ou jus frais pour démarrer votre commande.</p>
        <Link href="/boutique" className="inline-flex items-center gap-2 bg-btn-gradient text-secondary font-bold px-8 py-4 rounded-full min-h-[52px] hover:shadow-orange transition-all btn-glow">
          <span aria-hidden="true">🧆</span> Voir la boutique
        </Link>
      </div>
    </div>
  )

  /* ===== CART ===== */
  return (
    <div className="pt-[70px] min-h-screen bg-cream">

      {/* Mini hero */}
      <div className="bg-secondary py-10 grain-overlay relative overflow-hidden">
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full blur-3xl opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E8821A, transparent)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-cream/40 text-xs font-dm mb-3">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span aria-hidden="true">›</span>
            <Link href="/boutique" className="hover:text-primary transition-colors">Boutique</Link>
            <span aria-hidden="true">›</span>
            <span className="text-cream/70" aria-current="page">Panier</span>
          </nav>
          <h1 className="font-cormorant font-bold italic text-cream text-4xl sm:text-5xl">
            Mon Panier <span aria-hidden="true">🧆</span>
            <span className="ml-3 text-xl font-dm font-normal text-cream/50 not-italic">
              {totalItems} article{totalItems > 1 ? 's' : ''}
            </span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1440 32" preserveAspectRatio="none" className="w-full h-6 sm:h-8">
            <path d="M0,16 C360,32 720,0 1080,16 C1260,24 1380,8 1440,16 L1440,32 L0,32 Z" fill="#FFF8EE" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ===== LEFT ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* Items list */}
            <section aria-label="Articles du panier" className="bg-white rounded-3xl shadow-card overflow-hidden">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`px-5 sm:px-6 py-5 ${idx < items.length-1 ? 'border-b border-secondary/6' : ''} hover:bg-cream/40 transition-colors`}
                >
                  <div className="flex items-start gap-4">
                    {/* Thumb */}
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-orange-light flex-shrink-0 border border-secondary/8">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={72} height={72} className="w-full h-full object-cover" sizes="72px" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${item.color||'from-orange-300 to-amber-500'} flex items-center justify-center text-2xl`} aria-hidden="true">
                          {item.emoji||'🧆'}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-fraunces font-bold text-secondary text-sm leading-snug mb-0.5">{item.name}</div>
                      <div className="text-text-light text-xs font-dm">{item.unit}</div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Supprimer ${item.name}`}
                      className="w-10 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-secondary/25 hover:text-red-400 hover:bg-red-50 transition-all"
                    >
                      <svg className="w-4 h-4" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Qty + price */}
                  <div className="flex items-center justify-between mt-3 pl-[76px] sm:pl-[88px]">
                    <div className="flex items-center gap-1 bg-cream rounded-xl p-1" role="group" aria-label={`Quantité de ${item.name}`}>
                      <button onClick={() => updateQuantity(item.id, item.quantity-1)} aria-label="Diminuer" className="w-9 h-9 rounded-lg hover:bg-primary hover:text-cream text-secondary/60 font-bold flex items-center justify-center transition-all">−</button>
                      <span className="w-8 text-center font-bold text-secondary text-sm" aria-live="polite">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity+1)} aria-label="Augmenter" className="w-9 h-9 rounded-lg hover:bg-primary hover:text-cream text-secondary/60 font-bold flex items-center justify-center transition-all">+</button>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-text-light font-dm">{formatPrice(item.price)} × {item.quantity}</div>
                      <div className="font-cormorant font-bold text-primary text-xl">{formatPrice(item.price*item.quantity)}</div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="px-6 py-4 border-t border-secondary/6 flex gap-4 flex-wrap">
                <Link href="/boutique" className="text-sm text-primary font-medium hover:underline font-dm flex items-center gap-1 min-h-[44px]">
                  ← Continuer mes achats
                </Link>
                <button onClick={clearCart} className="text-sm text-red-400 font-medium hover:underline font-dm ml-auto min-h-[44px]">
                  <span aria-hidden="true">🗑</span> Vider le panier
                </button>
              </div>
            </section>

            {/* ===== FORM ===== */}
            <section id="form-start" aria-label="Informations de livraison" className="bg-white rounded-3xl shadow-card p-6 sm:p-8">
              <h2 className="font-cormorant font-bold italic text-secondary text-3xl mb-7">
                <span aria-hidden="true">📋</span> Vos coordonnées
              </h2>

              <form onSubmit={handlePay} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FloatInput id="prenom" name="prenom" label="Prénom" value={form.prenom} onChange={handleChange} error={errors.prenom} autoComplete="given-name" required />
                  <FloatInput id="nom"    name="nom"    label="Nom"    value={form.nom}    onChange={handleChange} error={errors.nom}    autoComplete="family-name" required />
                </div>

                <FloatInput id="telephone" name="telephone" type="tel" label="Téléphone Mobile Money"
                  value={form.telephone} onChange={handleChange} error={errors.telephone} autoComplete="tel" required />

                <FloatInput id="email" name="email" type="email" label="Email (pour la confirmation)"
                  value={form.email} onChange={handleChange} error={errors.email} autoComplete="email" required />

                <FloatTextarea id="adresse" name="adresse" label="Adresse de livraison"
                  value={form.adresse} onChange={handleChange} error={errors.adresse} autoComplete="street-address" required />

                <FloatInput id="quartier" name="quartier" label="Quartier / Commune"
                  value={form.quartier} onChange={handleChange} error={errors.quartier} autoComplete="address-level2" required />

                <FloatTextarea id="note" name="note" rows={2} label="Instructions / Note (optionnel)"
                  value={form.note} onChange={handleChange} />

                {/* Payment methods */}
                <div className="bg-cream rounded-2xl p-4 text-center">
                  <p className="text-xs font-bold text-text-light uppercase tracking-widest mb-3 font-dm">Paiement sécurisé via</p>
                  <div className="flex flex-wrap gap-2 justify-center" role="list">
                    {['📱 MTN MoMo', '🟠 Orange Money', '💙 Wave', '🟣 Moov'].map(m => (
                      <span key={m} role="listitem" className="bg-white border border-secondary/12 text-secondary/70 text-xs font-dm font-semibold px-3 py-1.5 rounded-full shadow-sm">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* API error */}
                {apiError && (
                  <div role="alert" aria-live="assertive" className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600 font-dm">
                    <span aria-hidden="true">⚠️</span> {apiError}
                  </div>
                )}

                {/* Pay button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-btn-gradient text-secondary font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-orange flex items-center justify-center gap-3 text-base min-h-[56px] disabled:opacity-60 disabled:cursor-not-allowed btn-glow"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Connexion à CinetPay…
                    </>
                  ) : (
                    <><span aria-hidden="true">💳</span> Payer avec CinetPay — {formatPrice(totalPrice)}</>
                  )}
                </button>

                {/* WhatsApp */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 rounded-2xl transition-colors flex items-center justify-center gap-2 text-sm min-h-[52px]"
                >
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Commander via WhatsApp
                </button>

                <p className="text-center text-xs text-text-light font-dm">
                  En commandant, vous acceptez nos{' '}
                  <Link href="/cgv" className="underline hover:text-primary" target="_blank" rel="noopener">
                    Conditions Générales de Vente
                  </Link>
                </p>
              </form>
            </section>
          </div>

          {/* ===== RIGHT — Sticky summary ===== */}
          <aside className="lg:sticky lg:top-24 space-y-4" aria-label="Récapitulatif de commande">
            <div className="bg-white rounded-3xl shadow-card p-6">
              <h2 className="font-cormorant font-bold text-secondary text-2xl mb-5">Récapitulatif</h2>
              <div className="space-y-2 mb-5 max-h-52 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-text-light font-dm truncate flex-1 pr-2">{item.shortName||item.name} × {item.quantity}</span>
                    <span className="font-bold text-secondary whitespace-nowrap font-dm">{formatPrice(item.price*item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-secondary/8 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-text-light font-dm">
                  <span>Sous-total</span><span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-light font-dm">
                  <span>Livraison</span><span className="text-primary font-medium">À confirmer</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-secondary/8 pt-3 mt-1">
                  <span className="font-bold text-secondary font-dm">Total</span>
                  <span className="font-cormorant font-bold text-primary text-3xl">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white rounded-3xl shadow-card p-5 text-center">
              <p className="text-xs font-bold text-text-light uppercase tracking-widest mb-3 font-dm">Paiement sécurisé</p>
              <div className="flex flex-wrap gap-2 justify-center" role="list">
                {['🔒 SSL', '✅ CinetPay', '📱 Mobile Money'].map(b => (
                  <span key={b} role="listitem" className="bg-cream text-text-light text-xs font-dm px-3 py-1.5 rounded-full">{b}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
