import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import {
  isAuthorized, readProducts, writeProducts, saveImage,
  deleteImageIfUnused, mergeProduct,
} from '@/lib/products-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function revalidateCatalog() {
  revalidatePath('/')
  revalidatePath('/boutique')
}

// PUT — édite un produit (multipart, image optionnelle)
export async function PUT(request, { params }) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    const { id } = await params
    const targetId = Number(id)
    const products = await readProducts()
    const idx = products.findIndex(p => Number(p.id) === targetId)
    if (idx === -1) {
      return NextResponse.json({ error: 'Produit introuvable' }, { status: 404 })
    }

    const form = await request.formData()
    const fields = {
      name:        form.get('name'),
      shortName:   form.get('shortName'),
      description: form.get('description'),
      price:       form.get('price'),
      unit:        form.get('unit'),
      category:    form.get('category'),
      bestseller:  form.get('bestseller'),
    }

    let imagePath
    let warning = null
    const file = form.get('image')
    if (file && typeof file === 'object' && file.size > 0) {
      try {
        imagePath = await saveImage(file, fields.name || 'produit')
      } catch (err) {
        warning = err?.message || 'Impossible d’enregistrer l’image.'
      }
    }

    const oldImage = products[idx].image
    const updated = mergeProduct(products[idx], fields, imagePath)
    products[idx] = updated
    await writeProducts(products)
    if (imagePath && oldImage !== imagePath) await deleteImageIfUnused(oldImage, products)
    revalidateCatalog()

    const response = { success: true, product: updated }
    if (warning) response.warning = warning
    return NextResponse.json(response)
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Édition impossible' }, { status: 400 })
  }
}

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
    revalidateCatalog()

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Suppression impossible' }, { status: 500 })
  }
}
