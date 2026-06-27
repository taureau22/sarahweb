import { getBlob } from '@/lib/blob-store'

export const runtime = 'nodejs'

// Sert une image uploadée depuis le store média (Netlify Blobs en prod, .data/ en local).
export async function GET(request, { params }) {
  const { id } = await params
  const blob = await getBlob('media', id)
  if (!blob) {
    return new Response('Image introuvable', { status: 404 })
  }
  return new Response(blob.buffer, {
    headers: {
      'Content-Type': blob.contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
