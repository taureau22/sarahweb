'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'

const INITIAL_FORM = {
  prenom: '', nom: '', email: '', telephone: '',
  adresse: '', quartier: '', note: '',
}

export default function PanierPage() {
  const router = useRouter()
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [form,    setForm]    = useState(INITIAL_FORM)
  const [errors,  setErrors]  = useState({})
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = (e) => {
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

  const handlePay = async (e) => {
    e.preventDefault()
    setApiError('')

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      document.getElementById('form-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    if (!items.length) {
      setApiError('Votre panier est vide.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/payment', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items:       items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer:    form,
          totalAmount: totalPrice,
        }),
      })
      const data = await res.json()

      if (data.success && data.paymentUrl) {
        // Sauvegarder la commande pour la page merci
        sessionStorage.setItem('elif_last_order', JSON.stringify({
          transactionId: data.transactionId,
          items, total: totalPrice, customer: form,
        }))
        window.location.href = data.paymentUrl
      } else {
        setApiError(data.error || 'Erreur de paiement. Réessayez ou utilisez WhatsApp.')
        setLoading(false)
      }
    } catch {
      setApiError('Erreur réseau. Vérifiez votre connexion.')
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250758440009'
    const lines = items.map(i => `• ${i.shortName || i.name} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`).join('\n')
    const msg = `Bonjour Le Panier d'Elif 🥟 !\n\nJe souhaite commander :\n\n${lines}\n\n*Total : ${formatPrice(totalPrice)}*\n\nMerci 🙏`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  // ===== EMPTY CART =====
  if (!items.length) {
    return (
      <div className="pt-24 min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-8xl mb-6">🛒</div>
          <h1 className="font-playfair text-3xl font-bold text-secondary mb-4">Panier vide</h1>
          <p className="text-gray-500 mb-8">Ajoutez de délicieux pastels ou jus frais pour démarrer votre commande.</p>
          <Link href="/boutique" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-2xl hover:bg-primary-dark transition-all">
            🥟 Voir la boutique
          </Link>
        </div>
      </div>
    )
  }

  // ===== CART WITH ITEMS =====
  return (
    <div className="pt-20 min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <nav className="text-sm text-gray-400 mb-3 flex items-center gap-2">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span>›</span>
            <Link href="/boutique" className="hover:text-primary">Boutique</Link>
            <span>›</span>
            <span className="text-dark">Panier</span>
          </nav>
          <h1 className="font-playfair text-4xl font-bold text-secondary">
            Mon Panier 🛒
            <span className="ml-3 text-lg font-poppins font-normal text-gray-400">
              ({totalItems} article{totalItems > 1 ? 's' : ''})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ===== LEFT — Items + Form ===== */}
          <div className="lg:col-span-2 space-y-6">

            {/* Items list */}
            <div className="bg-white rounded-2xl shadow-card overflow-hidden">
              {/* Items */}
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`px-4 sm:px-6 py-4 ${idx < items.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-cream/50 transition-colors`}
                >
                  {/* Row 1 : image + nom + supprimer */}
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-cream flex-shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} width={64} height={64} className="w-full h-full object-cover" sizes="64px" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${item.color || 'from-orange-300 to-amber-500'} flex items-center justify-center text-2xl`}>
                          {item.emoji || '🥟'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-dark text-sm leading-snug">{item.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.unit}</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 flex-shrink-0 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Row 2 : quantité + total ligne */}
                  <div className="flex items-center justify-between mt-3 pl-[68px] sm:pl-[76px]">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 hover:text-primary font-bold">
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-dark text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500 hover:text-primary font-bold">
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-400">{formatPrice(item.price)} × {item.quantity}</div>
                      <div className="font-bold text-secondary text-sm">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex gap-3 flex-wrap">
                <Link href="/boutique" className="text-sm text-primary font-medium hover:underline">
                  ← Continuer mes achats
                </Link>
                <button onClick={() => clearCart()} className="text-sm text-red-400 font-medium hover:underline ml-auto">
                  🗑 Vider le panier
                </button>
              </div>
            </div>

            {/* ===== CUSTOMER FORM ===== */}
            <div id="form-start" className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-playfair text-2xl font-bold text-secondary mb-6">
                📋 Vos coordonnées
              </h2>

              <form onSubmit={handlePay} noValidate className="space-y-5">
                {/* Row: Prénom / Nom */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Prénom <span className="text-red-400">*</span>
                    </label>
                    <input name="prenom" value={form.prenom} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-cream transition-colors focus:outline-none focus:bg-white ${errors.prenom ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                      placeholder="Votre prénom" />
                    {errors.prenom && <p className="text-red-400 text-xs mt-1">{errors.prenom}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-dark mb-1.5">
                      Nom <span className="text-red-400">*</span>
                    </label>
                    <input name="nom" value={form.nom} onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-cream transition-colors focus:outline-none focus:bg-white ${errors.nom ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                      placeholder="Votre nom" />
                    {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
                  </div>
                </div>

                {/* Téléphone */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Téléphone Mobile Money <span className="text-red-400">*</span>
                  </label>
                  <input name="telephone" value={form.telephone} onChange={handleChange} type="tel"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-cream transition-colors focus:outline-none focus:bg-white ${errors.telephone ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    placeholder="+225 07 58 44 00 09 (MTN, Orange, Wave…)" />
                  {errors.telephone && <p className="text-red-400 text-xs mt-1">{errors.telephone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Email <span className="text-red-400">*</span>
                    <span className="text-gray-400 font-normal ml-1">(pour la confirmation)</span>
                  </label>
                  <input name="email" value={form.email} onChange={handleChange} type="email"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-cream transition-colors focus:outline-none focus:bg-white ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    placeholder="votre@email.com" />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Adresse */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Adresse de livraison <span className="text-red-400">*</span>
                  </label>
                  <textarea name="adresse" value={form.adresse} onChange={handleChange} rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-cream transition-colors focus:outline-none focus:bg-white resize-none ${errors.adresse ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    placeholder="Rue, numéro, bâtiment, repère remarquable…" />
                  {errors.adresse && <p className="text-red-400 text-xs mt-1">{errors.adresse}</p>}
                </div>

                {/* Quartier */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Quartier / Commune <span className="text-red-400">*</span>
                  </label>
                  <input name="quartier" value={form.quartier} onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-cream transition-colors focus:outline-none focus:bg-white ${errors.quartier ? 'border-red-400' : 'border-gray-200 focus:border-primary'}`}
                    placeholder="Ex : Cocody, Yopougon, Marcory…" />
                  {errors.quartier && <p className="text-red-400 text-xs mt-1">{errors.quartier}</p>}
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-semibold text-dark mb-1.5">
                    Note / Instructions
                    <span className="text-gray-400 font-normal ml-1">(optionnel)</span>
                  </label>
                  <textarea name="note" value={form.note} onChange={handleChange} rows={2}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm bg-cream focus:border-primary focus:bg-white focus:outline-none resize-none transition-colors"
                    placeholder="Cuisson bien dorée, livraison après 18h, appeler avant…" />
                </div>

                {/* API error */}
                {apiError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
                    ⚠️ {apiError}
                  </div>
                )}

                {/* Payment methods */}
                <div className="bg-cream rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 text-center mb-3">Paiement sécurisé via</p>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {['📱 MTN MoMo', '🟠 Orange Money', '💙 Wave', '🟣 Moov'].map(m => (
                      <span key={m} className="bg-white border border-gray-200 text-gray-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pay button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-3 text-base"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Connexion à CinetPay…
                    </>
                  ) : (
                    <>💳 Payer avec CinetPay — {formatPrice(totalPrice)}</>
                  )}
                </button>

                {/* WhatsApp alternative */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                >
                  💬 Commander via WhatsApp (alternative)
                </button>

                <p className="text-center text-xs text-gray-400">
                  En passant commande, vous acceptez nos{' '}
                  <Link href="/cgv" className="underline hover:text-primary" target="_blank">
                    Conditions Générales de Vente
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* ===== RIGHT — Summary (sticky) ===== */}
          <div className="lg:sticky lg:top-24 space-y-4">
            {/* Summary card */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h2 className="font-playfair text-xl font-bold text-secondary mb-5">Récapitulatif</h2>

              <div className="space-y-2 mb-5 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 truncate flex-1 pr-2">
                      {item.shortName || item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-dark whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Sous-total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Livraison</span>
                  <span className="text-primary font-medium">À définir selon votre zone</span>
                </div>
                <div className="flex justify-between items-baseline font-bold border-t border-gray-100 pt-3 mt-2">
                  <span className="text-dark">Total</span>
                  <span className="font-playfair text-2xl text-secondary">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            {/* Security badges */}
            <div className="bg-white rounded-2xl shadow-card p-5 text-center">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Paiement 100% sécurisé</p>
              <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-500">
                <span className="bg-cream px-3 py-1.5 rounded-full">🔒 SSL chiffré</span>
                <span className="bg-cream px-3 py-1.5 rounded-full">✅ CinetPay certifié</span>
                <span className="bg-cream px-3 py-1.5 rounded-full">📱 Mobile Money CI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
