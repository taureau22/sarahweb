import { NextResponse } from 'next/server'
import {
  isAuthorized, readProducts, writeProducts, deleteImageIfUnused,
} from '@/lib/products-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// DELETE — supprime un produit (et son image si plus utilisée)
export async function DELETE(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    const { id } = await params
    const targetId = Number(id)
    const products = await readProducts()
    const target = products.find(p => Number(p.id) === targetId)
    if (!target) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })
    }
    const remaining = products.filter(p => Number(p.id) !== targetId)
    await writeProducts(remaining)
    await deleteImageIfUnused(target.image, remaining)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Suppression impossible' }, { status: 500 })
  }
}
