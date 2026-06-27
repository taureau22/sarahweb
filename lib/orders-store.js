import { getJSON, setJSON, listJSON, deleteJSON } from '@/lib/blob-store'

const STORE = 'orders'

export const VALID_STATUS = ['pending', 'paid', 'failed', 'preparing', 'delivered', 'cancelled']

/** Crée une commande (statut initial 'pending'). Clé = transactionId. */
export async function createOrder(order) {
  const record = {
    id: order.id,
    createdAt: new Date().toISOString(),
    channel: order.channel === 'whatsapp' ? 'whatsapp' : 'cinetpay',
    status: 'pending',
    items: order.items || [],
    customer: order.customer || {},
    amount: order.amount || 0,
    payment: {},
  }
  await setJSON(STORE, record.id, record)
  return record
}

export async function getOrder(id) {
  return getJSON(STORE, id, null)
}

/** Toutes les commandes, plus récentes d'abord. */
export async function listOrders() {
  const all = await listJSON(STORE)
  return all.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
}

/** Supprime TOUTES les commandes. Renvoie le nombre supprimé. */
export async function deleteAllOrders() {
  const all = await listJSON(STORE)
  let n = 0
  for (const o of all) {
    if (o?.id) { await deleteJSON(STORE, o.id); n++ }
  }
  return n
}

export async function updateOrder(id, patch) {
  const existing = await getJSON(STORE, id, null)
  if (!existing) return null
  const updated = {
    ...existing,
    ...patch,
    payment: { ...existing.payment, ...(patch.payment || {}) },
    updatedAt: new Date().toISOString(),
  }
  await setJSON(STORE, id, updated)
  return updated
}

/**
 * Vérifie l'état réel du paiement auprès de CinetPay (/v2/payment/check)
 * et met à jour la commande. Échoue en local (SSL intercepté) — normal, OK en prod.
 */
export async function verifyPayment(id) {
  // Repli sur les variables NEXT_PUBLIC_ si les clés serveur ne sont pas définies
  // (apikey + site_id sont publics par design CinetPay).
  const apikey  = process.env.CINETPAY_API_KEY  || process.env.NEXT_PUBLIC_CINETPAY_APIKEY
  const site_id = process.env.CINETPAY_SITE_ID  || process.env.NEXT_PUBLIC_CINETPAY_SITE_ID
  if (!apikey || !site_id) throw new Error('Clés CinetPay absentes côté serveur')

  const res = await fetch('https://api-checkout.cinetpay.com/v2/payment/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ apikey, site_id, transaction_id: id }),
  })
  const data = await res.json().catch(() => ({}))

  const cpStatus = data?.data?.status || null // ACCEPTED / REFUSED / PENDING...
  const payment = {
    cinetpayStatus: cpStatus,
    method:     data?.data?.payment_method || null,
    operatorId: data?.data?.operator_id || null,
    paidAt:     cpStatus === 'ACCEPTED' ? (data?.data?.payment_date || new Date().toISOString()) : null,
    checkCode:    data?.code || null,
    checkMessage: data?.message || null,
  }
  const patch = { payment }
  if (cpStatus === 'ACCEPTED') patch.status = 'paid'
  else if (cpStatus === 'REFUSED') patch.status = 'failed'

  const updated = await updateOrder(id, patch)
  return { updated, cinetpay: data }
}
