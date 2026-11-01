import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Úvodní obrazovka (#splash v index.html) se skryje, až když jsou načtená písma
// a uplynula minimální doba, aby stihla proběhnout animace loga a nic neproblikávalo.
const MIN_SPLASH_MS = 2300
const FONT_WAIT_MS = 3000

const splash = document.getElementById('splash')
if (splash) {
  const minTime = new Promise((resolve) => setTimeout(resolve, MIN_SPLASH_MS))
  // Pomalé připojení nesmí úvodní obrazovku držet donekonečna.
  const fonts = Promise.race([
    document.fonts?.ready ?? Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
  ])

  Promise.all([minTime, fonts]).then(() => {
    splash.classList.add('hide')
    splash.addEventListener('transitionend', () => splash.remove(), { once: true })
    // Záloha, kdyby přechod neproběhl (např. skrytá karta).
    setTimeout(() => splash.remove(), 1000)
  })
}
