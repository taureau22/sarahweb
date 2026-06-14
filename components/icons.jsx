/**
 * Jeu d'icônes SVG local — style Lucide (24×24, stroke 1.75, round).
 * Zéro dépendance npm. Toutes les icônes partagent le même langage visuel.
 * Usage : <Icon.Bag className="w-5 h-5" />
 */

function Svg({ children, className = 'w-6 h-6', strokeWidth = 1.75, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export const Icon = {
  Menu: (p) => <Svg {...p}><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" /></Svg>,

  X: (p) => <Svg {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Svg>,

  Bag: (p) => <Svg {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></Svg>,

  Plus: (p) => <Svg {...p}><path d="M5 12h14" /><path d="M12 5v14" /></Svg>,

  Minus: (p) => <Svg {...p}><path d="M5 12h14" /></Svg>,

  Trash: (p) => <Svg {...p}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></Svg>,

  ArrowRight: (p) => <Svg {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Svg>,

  ArrowUpRight: (p) => <Svg {...p}><path d="M7 7h10v10" /><path d="M7 17 17 7" /></Svg>,

  ChevronRight: (p) => <Svg {...p}><path d="m9 18 6-6-6-6" /></Svg>,

  Check: (p) => <Svg {...p}><path d="M20 6 9 17l-5-5" /></Svg>,

  MapPin: (p) => <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>,

  Phone: (p) => <Svg {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></Svg>,

  Clock: (p) => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Svg>,

  CreditCard: (p) => <Svg {...p}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></Svg>,

  Truck: (p) => <Svg {...p}><path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" /><path d="M14 9h4l3 3v5a1 1 0 0 1-1 1h-1" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></Svg>,

  Leaf: (p) => <Svg {...p}><path d="M11 20A7 7 0 0 1 4 13c0-6 4-9 16-10-1 8-4 13-9 14Z" /><path d="M4 21c2.5-5 6-8 12-9" /></Svg>,

  ChefHat: (p) => <Svg {...p}><path d="M6 13.87V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6.13" /><path d="M18 13.87a4 4 0 0 0 .59-7.5A5 5 0 0 0 9.4 4.5 4.5 4.5 0 0 0 6 13.87Z" /><line x1="6" y1="17" x2="18" y2="17" /></Svg>,

  Snowflake: (p) => <Svg {...p}><line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><path d="m20 16-4-4 4-4" /><path d="m4 8 4 4-4 4" /><path d="m16 4-4 4-4-4" /><path d="m8 20 4-4 4 4" /></Svg>,

  Sparkles: (p) => <Svg {...p}><path d="M12 3 13.9 8.6 19.5 10.5 13.9 12.4 12 18 10.1 12.4 4.5 10.5 10.1 8.6Z" /><path d="M19 15l.7 2.1 2.1.7-2.1.7-.7 2.1-.7-2.1-2.1-.7 2.1-.7Z" /></Svg>,

  Star: (p) => <Svg {...p}><path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z" /></Svg>,

  StarFilled: (p) => <Svg fill="currentColor" stroke="none" {...p}><path d="M12 2 15.09 8.26 22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01Z" /></Svg>,

  Heart: (p) => <Svg {...p}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></Svg>,

  ShieldCheck: (p) => <Svg {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" /><path d="m9 12 2 2 4-4" /></Svg>,

  Wallet: (p) => <Svg {...p}><path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /><path d="M21 12v-2a2 2 0 0 0-2-2H7a2 2 0 0 0 0 8h12a2 2 0 0 0 2-2Z" /><circle cx="16.5" cy="12" r="1" fill="currentColor" stroke="none" /></Svg>,

  Smartphone: (p) => <Svg {...p}><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></Svg>,

  ArrowDown: (p) => <Svg {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></Svg>,

  Instagram: (p) => <Svg {...p}><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></Svg>,

  Facebook: (p) => <Svg {...p}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" /></Svg>,

  // WhatsApp — glyph de marque officiel (rempli)
  WhatsApp: ({ className = 'w-6 h-6', ...props }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  ),
}

export default Icon
