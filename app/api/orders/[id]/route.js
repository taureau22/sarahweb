import { NextResponse } from 'next/server'
import { getOrder } from '@/lib/orders-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET public (champs limités) — utilisé par la page de confirmation /merci.
export async function GET(request, { params }) {
  const { id } = await params
  const o = await getOrder(id)
  if (!o) {
    return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
  }
  return NextResponse.json({
    order: {
      id: o.id,
      status: o.status,
      amount: o.amount,
      items: o.items,
      channel: o.channel,
      createdAt: o.createdAt,
    },
  })
}
