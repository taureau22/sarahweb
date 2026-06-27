import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createOrder } from '@/lib/orders-store'
import { readProducts, applyStockForOrder } from '@/lib/products-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// POST public — enregistre une commande (statut pending) avant paiement / WhatsApp.
export async function POST(request) {
  try {
    const body = await request.json()
    const { transactionId, items, customer, amount, channel } = body

    if (!transactionId || !/^ELIF-[A-Za-z0-9_-]+$/.test(String(transactionId))) {
      return NextResponse.json({ error: 'Référence de commande invalide' }, { status: 400 })
    }
    if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
      return NextResponse.json({ error: 'Panier invalide' }, { status: 400 })
    }
    if (!customer?.prenom || !customer?.nom || !customer?.telephone || !customer?.adresse) {
      return NextResponse.json({ error: 'Informations client incomplètes' }, { status: 400 })
    }
    const amt = Math.round(Number(amount))
    if (!Number.isFinite(amt) || amt < 100 || amt > 100_000) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }

    // Validate items: ensure product exists, for 'surgele' require an explicit option and verify price/flags.
    const products = await readProducts()
    for (const rawItem of items.slice(0, 20)) {
      const baseId = String(rawItem.id).split('-')[0]
      const prod = products.find(p => String(p.id) === String(baseId))
      if (!prod) {
        return NextResponse.json({ error: `Produit introuvable: ${String(rawItem.id)}` }, { status: 400 })
      }

      // if product has options (surgele), require a valid option
      if (prod.category === 'surgele' && Array.isArray(prod.options) && prod.options.length > 0) {
        // try to resolve option by id (from item id) or by provided option label/value
        let option = null
        const parts = String(rawItem.id).split('-')
        if (parts.length > 1) {
          const optId = parts.slice(1).join('-')
          option = prod.options.find(o => String(o.id) === String(optId))
        }
        if (!option && rawItem.option) {
          option = prod.options.find(o => String(o.id) === String(rawItem.option) || String(o.label).toLowerCase() === String(rawItem.option).toLowerCase())
        }
        if (!option) {
          return NextResponse.json({ error: `Référence invalide ou manquante pour le produit ${prod.name}` }, { status: 400 })
        }

        // canonical price check
        const canonicalPrice = Number(option.price ?? prod.price)
        const itemPrice = Math.round(Number(rawItem.price) || 0)
        if (itemPrice !== canonicalPrice) {
          return NextResponse.json({ error: `Prix invalide pour ${prod.name} — ${option.label}` }, { status: 400 })
        }

        // validate attrs: ensure no contradiction (e.g., poisson nature must not include fromage/creme)
        if (option.attrs && option.attrs.hasCheese === false) {
          const text = String(rawItem.option || rawItem.name || '')
          if (/fromage|frace|cr[eè]me|creme/i.test(text)) {
            return NextResponse.json({ error: `Option incompatible pour ${prod.name} — ${option.label}` }, { status: 400 })
          }
        }
      } else {
        // no options: price must match base product
        const canonical = Math.round(Number(prod.price) || 0)
        const itemPrice = Math.round(Number(rawItem.price) || 0)
        if (itemPrice !== canonical) {
          return NextResponse.json({ error: `Prix invalide pour ${prod.name}` }, { status: 400 })
        }
      }
    }

    // Build clean items using canonical product data to prevent tampering
    const cleanItems = []
    for (const rawItem of items.slice(0, 20)) {
      const baseId = String(rawItem.id).split('-')[0]
      const prod = products.find(p => String(p.id) === String(baseId))
      if (!prod) continue
      let itemObj = null
      if (prod.category === 'surgele' && Array.isArray(prod.options) && prod.options.length > 0) {
        // determine option (we validated earlier so must exist)
        let option = null
        const parts = String(rawItem.id).split('-')
        if (parts.length > 1) option = prod.options.find(o => String(o.id) === parts.slice(1).join('-'))
        if (!option && rawItem.option) option = prod.options.find(o => String(o.id) === String(rawItem.option) || String(o.label).toLowerCase() === String(rawItem.option).toLowerCase())
        if (!option) continue
        itemObj = {
          id: `${prod.id}-${option.id}`,
          name: `${prod.name} — ${option.label}`.slice(0, 120),
          price: Number(option.price ?? prod.price) || 0,
          quantity: Math.max(1, Math.min(999, Number(rawItem.quantity) || 1)),
          option: String(option.label).slice(0, 80),
          category: String(prod.category).slice(0, 30),
        }
      } else {
        itemObj = {
          id: String(prod.id),
          name: String(prod.name).slice(0, 120),
          price: Number(prod.price) || 0,
          quantity: Math.max(1, Math.min(999, Number(rawItem.quantity) || 1)),
          option: null,
          category: String(prod.category).slice(0, 30),
        }
      }
      if (itemObj) cleanItems.push(itemObj)
    }
    const cleanCustomer = {
      prenom:    String(customer.prenom).slice(0, 50),
      nom:       String(customer.nom).slice(0, 50),
      telephone: String(customer.telephone).slice(0, 20),
      adresse:   String(customer.adresse).slice(0, 200),
      quartier:  String(customer.quartier || '').slice(0, 100),
      note:      String(customer.note || '').slice(0, 500),
    }

    const order = await createOrder({
      id: transactionId,
      items: cleanItems,
      customer: cleanCustomer,
      amount: amt,
      channel,
    })

    // Décrément automatique du stock (best-effort, catalogue rafraîchi).
    try {
      await applyStockForOrder(cleanItems)
      revalidatePath('/')
      revalidatePath('/boutique')
    } catch {}

    return NextResponse.json({ success: true, transactionId: order.id })
  } catch {
    return NextResponse.json({ error: 'Création de commande impossible' }, { status: 500 })
  }
}
