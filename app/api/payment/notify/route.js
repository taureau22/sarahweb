import { NextResponse } from 'next/server'
import { verifyPayment } from '@/lib/orders-store'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// CinetPay teste l'URL en GET (doit répondre 200).
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}

// CinetPay notifie le paiement en POST (cpm_trans_id, cpm_site_id…).
// On vérifie l'état réel via /v2/payment/check et on met à jour la commande, puis 200.
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

    try {
      const { updated, cinetpay } = await verifyPayment(transactionId)
      console.log('[notify]', transactionId, '→', cinetpay?.data?.status, '| commande:', updated?.status || 'introuvable')
    } catch (e) {
      console.error('[notify] vérification impossible:', e?.message)
    }

    // Toujours répondre 200 à CinetPay pour acquitter la notification.
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[notify] Erreur:', err?.message)
    return NextResponse.json({ error: 'Erreur notification' }, { status: 500 })
  }
}
