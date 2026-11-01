import { next } from '@vercel/functions'

// Vercel Routing Middleware: bez platné cookie se nedostane nikdo k aplikaci,
// jen na přihlašovací stránku. Cookie vytváří api/login.js.
const MESSAGE = 'objed-zbozi-session'

// Veřejné soubory: přihlášení a ikony s manifestem (prohlížeč je načítá bez cookie).
const PUBLIC = new Set([
  '/login.html',
  '/api/login',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
])

const toHex = (buffer) =>
  [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')

async function sign(password) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  return toHex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(MESSAGE)))
}

const readCookie = (request, name) => {
  const match = (request.headers.get('cookie') ?? '').match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))
  return match ? match[1] : ''
}

export default async function middleware(request) {
  const { pathname } = new URL(request.url)
  if (PUBLIC.has(pathname)) return next()

  // Bez nastaveného hesla se nic nepustí.
  const password = process.env.APP_PASSWORD
  if (password && readCookie(request, 'auth') === (await sign(password))) return next()

  if ((request.headers.get('accept') ?? '').includes('text/html')) {
    return Response.redirect(new URL('/login.html', request.url), 302)
  }
  return new Response('Unauthorized', { status: 401 })
}
