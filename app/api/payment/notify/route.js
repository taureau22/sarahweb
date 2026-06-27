import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// CinetPay teste l'URL en GET (doit répondre 200).
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

// CinetPay notifie le paiement en POST (cpm_trans_id, cpm_site_id…).
// On vérifie l'état réel via l'API /v2/payment/check, puis on répond 200.
export async function POST(request) {
  try {
    let transactionId
    const ctype = request.headers.get('content-type') || ''
    if (ctype.includes('application/json')) {
      const j = await request.json().catch(() => ({}))
      transactionId = j.cpm_trans_id || j.transaction_id
    } else {
      const form = await request.formData().catch(() => null)
      transactionId = form?.get('cpm_trans_id') || form?.get('transaction_id')
    }

    if (!transactionId) {
      return NextResponse.json({ error: 'transaction_id manquant' }, { status: 400 })
    }

    const res = await fetch('https://api-checkout.cinetpay.com/v2/payment/check', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        apikey:         process.env.CINETPAY_API_KEY,
        site_id:        process.env.CINETPAY_SITE_ID,
        transaction_id: transactionId,
      }),
    })
    const data = await res.json().catch(() => ({}))

    console.log('[notify] Transaction', transactionId, '→', data?.code, data?.data?.status)
    // Ici on pourrait enregistrer la commande / envoyer un message si status === 'ACCEPTED'.

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[notify] Erreur:', err?.message)
    return NextResponse.json({ error: 'Erreur notification' }, { status: 500 })
  }
}
