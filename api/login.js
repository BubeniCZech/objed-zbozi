import { createHmac, timingSafeEqual } from 'node:crypto'

// Přihlášení heslem. Heslo je v proměnné prostředí APP_PASSWORD (nastavuje se ve Vercelu, ne v kódu).
// Po úspěchu se nastaví cookie s podpisem odvozeným z hesla, takže změna hesla odhlásí všechny.
const MESSAGE = 'objed-zbozi-session'
const YEAR = 60 * 60 * 24 * 365

const sign = (password) => createHmac('sha256', password).update(MESSAGE).digest('hex')

const same = (a, b) => {
  const left = createHmac('sha256', 'cmp').update(String(a)).digest()
  const right = createHmac('sha256', 'cmp').update(String(b)).digest()
  return timingSafeEqual(left, right)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method' })
  }

  const expected = process.env.APP_PASSWORD
  if (!expected) return res.status(500).json({ error: 'not-configured' })

  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (!same(password, expected)) {
    // Krátké zdržení zpomalí hádání hesla.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return res.status(401).json({ error: 'wrong-password' })
  }

  res.setHeader(
    'Set-Cookie',
    `auth=${sign(expected)}; Path=/; Max-Age=${YEAR}; HttpOnly; Secure; SameSite=Lax`,
  )
  return res.status(200).json({ ok: true })
}
