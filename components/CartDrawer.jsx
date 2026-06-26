'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/data/products'
import { Icon } from '@/components/icons'

export default function CartDrawer() {
  const {
    items, totalPrice, totalItems, atLimit,
    drawerOpen, closeDrawer,
    removeFromCart, updateQuantity,
  } = useCart()

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const handleWhatsApp = () => {
    const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '2250710669990'
    const lines = items.map(i =>
      `• ${i.shortName || i.name} × ${i.quantity} = ${formatPrice(i.price * i.quantity)}`
    ).join('\n')
    const msg = `Bonjour Le Panier d'Elif !\n\nJe souhaite commander :\n\n${lines}\n\n*Total : ${formatPrice(totalPrice)}*\n\nMerci`
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener')
    closeDrawer()
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeDrawer}
        className={`fixed inset-0 z-[60] bg-ink/45 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Votre panier"
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[420px] bg-bg flex flex-col shadow-lift transition-transform duration-300 ease-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
          <div>
            <h2 className="font-display font-semibold text-ink text-2xl leading-none">Panier</h2>
            <p className="text-xs text-muted mt-1.5">
              {totalItems > 0 ? `${totalItems} article${totalItems > 1 ? 's' : ''}` : 'Vide'}
            </p>
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Fermer le panier"
            className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-ink/5 hover:bg-ink/10 text-ink transition-colors"
          >
            <Icon.X className="w-5 h-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <div className="w-16 h-16 rounded-full bg-terra-bg inline-flex items-center justify-center text-terracotta">
              <Icon.Bag className="w-7 h-7" />
            </div>
            <p className="font-display font-semibold text-ink text-xl">Votre panier est vide</p>
            <p className="text-muted text-sm leading-relaxed">
              Ajoutez des pastels ou jus frais pour démarrer votre commande.
            </p>
            <Link
              href="/boutique"
              onClick={closeDrawer}
              className="mt-2 inline-flex items-center gap-2 h-12 px-6 rounded-full bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors"
            >
              Voir le menu <Icon.ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Limit warning */}
            {atLimit && (
              <div className="mx-4 mt-4 px-4 py-3 rounded-2xl bg-terra-bg border border-terracotta/20 text-sm text-terracotta">
                Limite atteinte (20 articles / 100 000 FCFA)
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item, idx) => (
                <div
                  key={item.id}
                  className={`py-5 flex items-start gap-4 ${idx < items.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 bg-terra-bg border border-border">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-olive">
                        <Icon.Leaf className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink text-sm leading-snug line-clamp-2">
                      {item.shortName || item.name}
                    </p>
                    <p className="text-muted text-xs mt-0.5">{item.unit}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div
                        className="inline-flex items-center border border-border rounded-full"
                        role="group"
                        aria-label={`Quantité de ${item.shortName || item.name}`}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuer"
                          className="w-8 h-8 inline-flex items-center justify-center text-ink-2 hover:text-terracotta transition-colors"
                        >
                          <Icon.Minus className="w-4 h-4" />
                        </button>
                        <span
                          className="w-7 text-center text-sm font-semibold text-ink tabular-nums"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Augmenter"
                          className="w-8 h-8 inline-flex items-center justify-center text-ink-2 hover:text-terracotta transition-colors"
                        >
                          <Icon.Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="font-display font-semibold text-ink text-lg tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Supprimer ${item.shortName || item.name}`}
                    className="w-8 h-8 flex-shrink-0 inline-flex items-center justify-center rounded-full text-muted hover:text-terracotta hover:bg-terra-bg transition-colors"
                  >
                    <Icon.Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border p-6 space-y-4 flex-shrink-0">
              <div className="flex items-center gap-2 text-xs text-muted">
                <Icon.Truck className="w-4 h-4 text-olive" />
                Livraison partout en CI ·{' '}
                <span className="text-ink-2 font-medium">à confirmer</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="font-medium text-ink-2">Total</span>
                <span className="font-display font-semibold text-ink text-3xl tabular-nums">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <Link
                href="/panier"
                onClick={closeDrawer}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full bg-terracotta text-white font-medium hover:bg-[#D2761C] transition-colors"
              >
                Finaliser la commande <Icon.ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-full border border-border text-ink font-medium hover:border-whatsapp hover:text-whatsapp transition-colors"
              >
                <Icon.WhatsApp className="w-4 h-4" /> Commander via WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
