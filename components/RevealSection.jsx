/**
 * Wrapper d'apparition au scroll — amélioration progressive.
 * La logique de révélation vit dans un script vanilla inline (app/layout.jsx),
 * indépendant de React. Ce composant applique uniquement les classes CSS.
 * Contenu visible sans JS (opacity: 1 par défaut).
 */
export default function RevealSection({ children, className = '', delay = 0 }) {
  const delayClass = delay ? `reveal-delay-${delay}` : ''
  return (
    <div className={`reveal ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  )
}
