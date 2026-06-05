import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { items, customer, totalAmount } = body

    // Validation serveur
    if (!items?.length || !customer || !totalAmount) {
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }
    if (items.length > 50) {
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
    if (typeof totalAmount !== 'number' || totalAmount < 100 || totalAmount > 5_000_000) {
      return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
    }
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const transactionId = `ELIF-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)
      .toUpperCase()}`

    const cinetpayData = {
      apikey:               process.env.CINETPAY_API_KEY,
      site_id:              process.env.CINETPAY_SITE_ID,
      transaction_id:       transactionId,
      amount:               totalAmount,
      currency:             'XOF',
      description:          `Commande Le Panier d'Elif — ${items.length} article(s)`,
      customer_name:        customer.nom,
      customer_surname:     customer.prenom,
      customer_email:       customer.email || '',
      customer_phone_number: customer.telephone,
      customer_address:     customer.adresse,
      customer_city:        customer.quartier || 'Abidjan',
      customer_country:     'CI',
      customer_state:       'CI',
      customer_zip_code:    '00225',
      notify_url:           `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/notify`,
      return_url:           `${process.env.NEXT_PUBLIC_SITE_URL}/merci?tx=${transactionId}`,
      cancel_url:           `${process.env.NEXT_PUBLIC_SITE_URL}/annulation`,
      channels:             'MOBILE_MONEY',
      metadata:             JSON.stringify({ transactionId, itemCount: items.length }),
    }

    const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(cinetpayData),
    })

    const data = await response.json()

    if (data.code === '201') {
      return NextResponse.json({
        success:       true,
        paymentUrl:    data.data.payment_url,
        transactionId,
      })
    }

    return NextResponse.json(
      { error: 'Erreur CinetPay', details: data.message || 'Réponse inattendue' },
      { status: 400 }
    )

  } catch (error) {
    console.error('[CinetPay] Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}

// Webhook CinetPay (notify_url)
export async function GET() {
  return NextResponse.json({ status: 'ok', service: "Le Panier d'Elif" })
}
