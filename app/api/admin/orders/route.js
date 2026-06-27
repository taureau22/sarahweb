import { NextResponse } from 'next/server'
import { isAuthorized } from '@/lib/products-store'
import { listOrders } from '@/lib/orders-store'

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
