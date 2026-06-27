import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/orders-store'

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

    const cleanItems = items.slice(0, 20).map(i => ({
      id: i.id,
      name: String(i.name || '').slice(0, 120),
      price: Number(i.price) || 0,
      quantity: Math.max(1, Math.min(99, Number(i.quantity) || 1)),
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
