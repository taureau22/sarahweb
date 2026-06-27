// Source de vérité unique pour les coordonnées de la boutique.
//
// Le numéro WhatsApp est codé en dur VOLONTAIREMENT : une variable
// NEXT_PUBLIC_* est figée au moment du build sur Vercel, ce qui a déjà
// provoqué l'affichage de l'ancien numéro. Ici, un seul endroit à changer.
export const WHATSAPP_NUMBER = '2250710669990'

// Lien WhatsApp prêt à l'emploi (message optionnel déjà encodé).
export function waLink(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
