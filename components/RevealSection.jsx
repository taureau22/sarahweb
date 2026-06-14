/**
 * Wrapper d'apparition au scroll.
 * La logique de révélation vit dans un script vanilla inline (app/layout.jsx),
 * indépendant de React → le contenu apparaît même si l'hydratation échoue.
 * Ce composant ne fait qu'appliquer les classes : aucun hook, aucun JS client requis.
 */
export default function RevealSection({ children, className = '', delay = 0 }) {
  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return <div className={`reveal ${delayClass} ${className}`}>{children}</div>
}
