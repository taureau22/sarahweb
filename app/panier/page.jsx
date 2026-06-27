'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

const INITIAL = { prenom: '', nom: '', telephone: '', adresse: '', quartier: '', note: '' }

function Field({ id, name, type = 'text', label, value, onChange, error, autoComplete, required, textarea, rows = 3 }) {
  const base = `peer w-full bg-surface border rounded-2xl px-4 pt-6 pb-2.5 text-[15px] text-ink focus:outline-none transition-colors ${
    error ? 'border-terracotta' : 'border-border focus:border-terracotta'
  }`
  const labelCls = `absolute left-4 top-4 text-sm text-muted pointer-events-none transition-all duration-200 origin-left
    peer-focus:-translate-y-2.5 peer-focus:scale-[.8] peer-focus:text-terracotta
    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[.8]`
  return (
    <div>
      <div className="relative">
        {textarea ? (
          <textarea
            id={id} name={name} value={value} onChange={onChange} rows={rows}
            autoComplete={autoComplete} required={required} aria-required={required}
            aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
            placeholder=" " className={`${base} resize-none`}
          />
        ) : (
          <input
            id={id} name={name} type={type} value={value} onChange={onChange}
            autoComplete={autoComplete} required={required} aria-required={required}
            aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined}
            placeholder=" " className={base}
          />
        )}
        <label htmlFor={id} className={labelCls}>
          {label}{required && <span className="text-terracotta ml-0.5">*</span>}
        </label>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="text-terracotta text-xs mt-1.5 ml-1">
          {error}
        </p>
      )}
    </div>
  )
}

export default function PanierPage() {
  const { items, totalPrice, totalItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [form, setForm]         = useState(INITIAL)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [apiError, setApiError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.prenom.trim())    errs.prenom    = 'Prénom requis'
    if (!form.nom.trim())       errs.nom       = 'Nom requis'
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
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer: form,
          totalAmount: totalPrice,
        }),
      })
      const data = await res.json()
      if (data.success && data.paymentUrl) {
        sessionStorage.setItem('elif_last_order', JSON.stringify({
          transactionId: data.transactionId, items, total: totalPrice, customer: form,
        }))
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
    const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
    const lines = items.map(i =>
      `• ${i.shortName || i.name} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`
    ).join('\n')
    const msg = `Bonjour Le Panier d'Elif !\n\nJe souhaite commander :\n\n${lines}\n\n*Total : ${formatPrice(totalPrice)}*\n\nMerci`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
  }

  /* Empty cart */
  if (!items.length) return (
    <div className="pt-16 sm:pt-[72px] min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="text-center max-w-sm py-24">
        <div className="w-20 h-20 mx-auto rounded-full bg-terra-bg text-terracotta flex items-center justify-center mb-6">
          <Icon.Bag className="w-9 h-9" strokeWidth={1.5} />
        </div>
        <h1 className="font-display font-semibold text-ink text-3xl mb-3">Votre panier est vide</h1>
        <p className="text-ink-2 mb-8">Ajoutez des pastels pour démarrer votre commande.</p>
        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 h-13 px-7 py-4 rounded-full bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors"
        >
          Voir le menu <Icon.ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="pt-24 sm:pt-32 min-h-screen bg-bg pb-20">
      <div className="max-w-8xl mx-auto px-5 sm:px-8">

        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-muted text-sm mb-3">
          <Link href="/" className="hover:text-terracotta transition-colors">Accueil</Link>
          <Icon.ChevronRight className="w-3.5 h-3.5" />
          <Link href="/boutique" className="hover:text-terracotta transition-colors">Boutique</Link>
          <Icon.ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink" aria-current="page">Panier</span>
        </nav>

        <h1 className="font-display font-semibold text-ink text-[clamp(2.2rem,5vw,3.5rem)] leading-none tracking-tightest mb-10">
          Votre panier
          <span className="ml-3 text-lg font-sans font-normal text-muted align-middle">
            {totalItems} article{totalItems > 1 ? 's' : ''}
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Items */}
            <section aria-label="Articles" className="bg-surface rounded-3xl border border-border overflow-hidden">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`p-5 flex items-start gap-4 ${idx < items.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-terra-bg border border-border flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-olive">
                        <Icon.Leaf className="w-7 h-7" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-ink leading-snug">{item.shortName || item.name}</p>
                        <p className="text-muted text-xs mt-0.5">{item.unit}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Supprimer ${item.name}`}
                        className="w-9 h-9 inline-flex items-center justify-center rounded-full text-muted hover:text-terracotta hover:bg-terra-bg transition-colors flex-shrink-0"
                      >
                        <Icon.Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div
                        className="inline-flex items-center border border-border rounded-full"
                        role="group"
                        aria-label={`Quantité de ${item.name}`}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuer"
                          className="w-9 h-9 inline-flex items-center justify-center text-ink-2 hover:text-terracotta transition-colors"
                        >
                          <Icon.Minus className="w-4 h-4" />
                        </button>
                        <span
                          className="w-8 text-center text-sm font-semibold text-ink tabular-nums"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Augmenter"
                          className="w-9 h-9 inline-flex items-center justify-center text-ink-2 hover:text-terracotta transition-colors"
                        >
                          <Icon.Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-display font-semibold text-ink text-xl tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="px-5 py-4 border-t border-border flex items-center justify-between">
                <Link
                  href="/boutique"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-terracotta transition-colors"
                >
                  <Icon.ArrowRight className="w-4 h-4 rotate-180" /> Continuer mes achats
                </Link>
                <button
                  onClick={clearCart}
                  className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-terracotta transition-colors"
                >
                  <Icon.Trash2 className="w-4 h-4" /> Vider
                </button>
              </div>
            </section>

            {/* Order form */}
            <section
              id="form-start"
              aria-label="Informations de livraison"
              className="bg-surface rounded-3xl border border-border p-6 sm:p-8"
            >
              <h2 className="font-display font-semibold text-ink text-2xl mb-6">
                Coordonnées de livraison
              </h2>
              <form onSubmit={handlePay} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    id="prenom" name="prenom" label="Prénom"
                    value={form.prenom} onChange={handleChange}
                    error={errors.prenom} autoComplete="given-name" required
                  />
                  <Field
                    id="nom" name="nom" label="Nom"
                    value={form.nom} onChange={handleChange}
                    error={errors.nom} autoComplete="family-name" required
                  />
                </div>
                <Field
                  id="telephone" name="telephone" type="tel"
                  label="Téléphone Mobile Money"
                  value={form.telephone} onChange={handleChange}
                  error={errors.telephone} autoComplete="tel" required
                />
                <Field
                  id="adresse" name="adresse" textarea
                  label="Adresse de livraison"
                  value={form.adresse} onChange={handleChange}
                  error={errors.adresse} autoComplete="street-address" required
                />
                <Field
                  id="quartier" name="quartier" label="Quartier / Commune"
                  value={form.quartier} onChange={handleChange}
                  error={errors.quartier} autoComplete="address-level2" required
                />
                <Field
                  id="note" name="note" textarea rows={2}
                  label="Instructions (optionnel)"
                  value={form.note} onChange={handleChange}
                />

                {/* Payment methods */}
                <div className="rounded-2xl bg-bg border border-border p-4">
                  <p className="text-xs uppercase tracking-wider text-muted font-semibold mb-3">
                    Paiement sécurisé via
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { Ico: Icon.Wallet,     l: 'Orange Money' },
                      { Ico: Icon.Smartphone, l: 'Wave' },
                    ].map(({ Ico, l }) => (
                      <span
                        key={l}
                        className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-3.5 py-2 text-sm text-ink-2"
                      >
                        <Ico className="w-4 h-4 text-terracotta" /> {l}
                      </span>
                    ))}
                  </div>
                </div>

                {apiError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-2xl bg-terra-bg border border-terracotta/30 p-4 text-sm text-terracotta"
                  >
                    <Icon.X className="w-4 h-4 mt-0.5 shrink-0" /> {apiError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-full bg-terracotta text-white font-medium inline-flex items-center justify-center gap-2 hover:bg-[#D2761C] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Connexion au paiement…
                    </>
                  ) : (
                    <><Icon.CreditCard className="w-5 h-5" /> Payer {formatPrice(totalPrice)}</>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full h-12 rounded-full border border-border text-ink font-medium inline-flex items-center justify-center gap-2 hover:border-whatsapp hover:text-whatsapp transition-colors"
                >
                  <Icon.WhatsApp className="w-4 h-4" /> Commander via WhatsApp
                </button>

                <p className="text-center text-xs text-muted">
                  En commandant, vous acceptez nos{' '}
                  <Link href="/cgv" className="text-terracotta hover:underline" target="_blank" rel="noopener">
                    Conditions Générales de Vente
                  </Link>.
                </p>
              </form>
            </section>
          </div>

          {/* Sticky summary */}
          <aside className="lg:sticky lg:top-24 space-y-4" aria-label="Récapitulatif">
            <div className="bg-surface rounded-3xl border border-border p-6">
              <h2 className="font-display font-semibold text-ink text-xl mb-5">Récapitulatif</h2>
              <div className="space-y-2.5 mb-5 max-h-56 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-baseline text-sm gap-3">
                    <span className="text-ink-2 truncate">
                      {item.shortName || item.name} × {item.quantity}
                    </span>
                    <span className="font-medium text-ink tabular-nums whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2.5">
                <div className="flex justify-between text-sm text-ink-2">
                  <span>Sous-total</span>
                  <span className="tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm text-ink-2">
                  <span>Livraison</span>
                  <span className="text-terracotta">À confirmer</span>
                </div>
                <div className="flex justify-between items-baseline border-t border-border pt-3">
                  <span className="font-medium text-ink">Total</span>
                  <span className="font-display font-semibold text-ink text-2xl tabular-nums">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-3xl border border-border p-5">
              <div className="flex items-center gap-2.5 text-sm text-ink-2">
                <Icon.ShieldCheck className="w-5 h-5 text-olive shrink-0" />
                Paiement chiffré SSL · CinetPay certifié
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
