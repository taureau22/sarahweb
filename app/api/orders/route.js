import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/orders-store'
import { readProducts } from '@/lib/products-store'

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

    // Validate items: for 'surgele' products require a selected option/reference.
    const products = await readProducts()
    for (const i of items.slice(0, 20)) {
      const baseId = String(i.id).split('-')[0]
      const prod = products.find(p => String(p.id) === String(baseId))
      if (prod && prod.category === 'surgele' && Array.isArray(prod.options) && prod.options.length > 0) {
        const hasOption = (i.option && String(i.option).trim()) || String(i.id).includes('-') || (i.name && String(i.name).includes('—'))
        if (!hasOption) {
          return NextResponse.json({ error: `Référence manquante pour le produit ${String(i.name || i.id)}` }, { status: 400 })
        }
      }
    }

    const cleanItems = items.slice(0, 20).map(i => ({
      id: i.id,
      name: String(i.name || '').slice(0, 120),
      price: Number(i.price) || 0,
      quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
      option: i.option ? String(i.option).slice(0, 80) : null,
      category: i.category ? String(i.category).slice(0, 30) : null,
    }))
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
    return NextResponse.json({ success: true, transactionId: order.id })
  } catch {
    return NextResponse.json({ error: 'Création de commande impossible' }, { status: 500 })
  }
}
