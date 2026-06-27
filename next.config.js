/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== 'production'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy',       value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // En dev, Next.js (Fast Refresh) a besoin de 'unsafe-eval'.
      // cdn.cinetpay.com sert le SDK Seamless (guichet de paiement).
      `script-src 'self' 'unsafe-inline' https://cdn.cinetpay.com${isDev ? " 'unsafe-eval'" : ''}`,
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self'",
      "img-src 'self' data: blob: https://*.cinetpay.com",
      // En dev, HMR utilise un websocket (ws/wss).
      `connect-src 'self' https://api-checkout.cinetpay.com https://*.cinetpay.com${isDev ? ' ws: wss:' : ''}`,
      // La popup Seamless est une iframe servie par CinetPay.
      "frame-src https://*.cinetpay.com",
    ].join('; '),
  },
]

const nextConfig = {
  // @netlify/blobs est résolu au runtime (pas bundlé) — évite tout souci de build.
  serverExternalPackages: ['@netlify/blobs'],
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 86400,
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

module.exports = nextConfig
