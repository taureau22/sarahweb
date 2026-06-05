export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://lepanierdelif.ci'
  return [
    { url: base,            lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/boutique`, lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/panier`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/cgv`,      lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ]
}
