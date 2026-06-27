import { NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/products-store'
import { updateOrder, verifyPayment, VALID_STATUS } from '@/lib/orders-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// PATCH — change le statut d'une commande (admin).
export async function PATCH(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  if (!VALID_STATUS.includes(body.status)) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 400 })
  }
  const updated = await updateOrder(id, { status: body.status })
  if (!updated) {
    return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
  }
  return NextResponse.json({ success: true, order: updated })
}

// POST — vérifie le paiement auprès de CinetPay et met à jour la commande (admin).
export async function POST(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const { id } = await params
  try {
    const { updated, cinetpay } = await verifyPayment(id)
    if (!updated) {
      return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
    }
    return NextResponse.json({ success: true, order: updated, cinetpay })
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Vérification impossible' }, { status: 502 })
  }
}
