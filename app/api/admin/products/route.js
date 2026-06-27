import { NextResponse } from 'next/server'
import {
  isAuthorized, readProducts, writeProducts, saveImage, buildProduct,
} from '@/lib/products-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// GET — liste des produits (admin)
export async function GET(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
    const products = await readProducts()
    return NextResponse.json({ products })
  } catch {
    return NextResponse.json({ error: 'Lecture impossible' }, { status: 500 })
  }
}

// POST — ajoute un produit (multipart/form-data avec image optionnelle)
export async function POST(request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  try {
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

    const products = await readProducts()

    let imagePath = null
    let warning = null
    const file = form.get('image')
    if (file && typeof file === 'object' && file.size > 0) {
      try {
        imagePath = await saveImage(file, fields.name || 'produit')
      } catch (err) {
        warning = err?.message || 'Impossible d’enregistrer l’image.'
      }
    }

    const product = buildProduct(fields, imagePath, products)
    products.push(product)
    await writeProducts(products)

    const response = { success: true, product }
    if (warning) response.warning = warning
    return NextResponse.json(response, { status: 201 })
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || 'Création impossible' },
      { status: 400 }
    )
  }
}
