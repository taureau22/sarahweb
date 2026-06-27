import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const CINETPAY_URL = 'https://api-checkout.cinetpay.com/v2/payment'

/** Détermine l'URL publique de base (https) à partir de l'env ou des headers. */
function getBaseUrl(request) {
  const env = process.env.NEXT_PUBLIC_SITE_URL
  if (env && env.startsWith('http') && !env.includes('localhost')) return env.replace(/\/$/, '')
  const host  = request.headers.get('host')
  const proto = request.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https')
  return host ? `${proto}://${host}` : (env || '')
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { items, customer, totalAmount } = body

    // --- Validation entrée ---
    if (!items?.length || !customer || !totalAmount) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }
    if (items.length > 20) {
      return NextResponse.json({ error: 'Commande invalide' }, { status: 400 })
    }
    if (!customer.prenom || !customer.nom || !customer.telephone || !customer.adresse) {
      return NextResponse.json({ error: 'Informations client incomplètes' }, { status: 400 })
    }
    const MAX = { prenom: 50, nom: 50, telephone: 20, adresse: 200, quartier: 100, note: 500 }
    for (const [field, max] of Object.entries(MAX)) {
      if (customer[field] && String(customer[field]).length > max) {
        return NextResponse.json({ error: `Champ ${field} trop long` }, { status: 400 })
      }
    }

    // --- Montant : entier, ≥ 5, multiple de 5 (exigence XOF CinetPay) ---
    let amount = Math.round(Number(totalAmount))
    if (!Number.isFinite(amount) || amount < 100 || amount > 100_000) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }
    if (amount % 5 !== 0) amount = Math.ceil(amount / 5) * 5

    // --- Clés API ---
    const apikey  = process.env.CINETPAY_API_KEY
    const site_id = process.env.CINETPAY_SITE_ID
    if (!apikey || !site_id) {
      console.error('[payment] Clés CinetPay manquantes (CINETPAY_API_KEY / CINETPAY_SITE_ID)')
      return NextResponse.json(
        { error: 'Configuration paiement absente côté serveur (clés CinetPay).' },
        { status: 500 }
      )
    }

    const baseUrl = getBaseUrl(request)
    const transactionId = `ELIF-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    const cinetpayData = {
      apikey,
      site_id,
      transaction_id:        transactionId,
      amount,
      currency:              'XOF',
      description:           `Commande Le Panier d'Elif - ${items.length} article(s)`,
      // customer_id est requis par CinetPay (figure dans l'exemple officiel)
      customer_id:           transactionId,
      customer_name:         customer.nom,
      customer_surname:      customer.prenom,
      customer_email:        customer.email || 'client@lepanierdelif.ci',
      customer_phone_number: customer.telephone,
      customer_address:      customer.adresse,
      customer_city:         customer.quartier || 'Abidjan',
      customer_country:      'CI',
      customer_state:        'CI',
      customer_zip_code:     '00225',
      notify_url:            `${baseUrl}/api/payment/notify`,
      return_url:            `${baseUrl}/merci?tx=${transactionId}`,
      channels:              'MOBILE_MONEY',
      metadata:              JSON.stringify({ transactionId, itemCount: items.length }),
      lang:                  'fr',
    }

    let response, data
    try {
      response = await fetch(CINETPAY_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(cinetpayData),
      })
      data = await response.json()
    } catch (netErr) {
      console.error('[payment] Échec réseau vers CinetPay:', netErr?.message)
      return NextResponse.json(
        { error: 'Impossible de joindre CinetPay. Réessayez, ou commandez via WhatsApp.' },
        { status: 502 }
      )
    }

    if (data?.code === '201' && data?.data?.payment_url) {
      return NextResponse.json({ success: true, paymentUrl: data.data.payment_url, transactionId })
    }

    // Erreur CinetPay : on log ET on remonte le code/message réels pour diagnostic
    console.error('[payment] CinetPay a refusé:', { code: data?.code, message: data?.message, description: data?.description })
    return NextResponse.json(
      {
        error: `Paiement refusé par CinetPay (${data?.code || '?'} ${data?.message || ''}). ${data?.description || ''}`.trim(),
        code: data?.code,
        message: data?.message,
        description: data?.description,
      },
      { status: 400 }
    )

  } catch (err) {
    console.error('[payment] Erreur interne:', err?.message)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', service: "Le Panier d'Elif" })
}
