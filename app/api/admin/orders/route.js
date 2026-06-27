import { NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/products-store'
import { listOrders, deleteAllOrders } from '@/lib/orders-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET — liste complète des commandes (admin).
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    const orders = await listOrders()
    return NextResponse.json({ orders })
  } catch {
    return NextResponse.json({ error: 'Lecture impossible' }, { status: 500 })
  }
}

// DELETE — vide TOUTES les commandes. Double sécurité : header admin + mot de
// passe reconfirmé dans le corps de la requête.
export async function DELETE(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const body = await request.json().catch(() => ({}))
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || body?.password !== expected) {
    return NextResponse.json({ error: 'Mot de passe de confirmation incorrect.' }, { status: 403 })
  }
  try {
    const count = await deleteAllOrders()
    return NextResponse.json({ success: true, deleted: count })
  } catch {
    return NextResponse.json({ error: 'Suppression impossible' }, { status: 500 })
  }
}
