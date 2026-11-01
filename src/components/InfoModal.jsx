import { motion } from 'motion/react'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import TypedText from './TypedText.jsx'

const MIN_ZOOM = 1
const MAX_ZOOM = 3
const BUTTON_STEP = 1.5
const DOUBLE_TAP_ZOOM = 2.5
const DOUBLE_TAP_MS = 300
const CLOSE_MS = 120

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)

// Modální okno s nápovědou k položce: obrázek se psaným textem, přibližování a tlačítko pro zavření.
// Vykresluje se do <body>, protože předek s animací (transform) by jinak rozbil `position: fixed`.
function InfoModal({ item, theme, onClose }) {
  const closeRef = useRef(null)
  const frameRef = useRef(null)
  const [closing, setClosing] = useState(false)
  // Přiblížení a posun obrázku: `s` = měřítko, `x` a `y` = posun v px od středu.
  const [view, setView] = useState({ s: 1, x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const gesture = useRef({ pointers: new Map(), pan: null, pinch: null, moved: false, lastTap: 0 })

  // Krátká animace ikony zavření (jako v panelu objednávky), potom se okno zavře.
  const requestClose = () => {
    if (closing) return
    setClosing(true)
    setTimeout(onClose, CLOSE_MS)
  }
  const requestCloseRef = useRef(requestClose)
  useEffect(() => {
    requestCloseRef.current = requestClose
  })

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') requestCloseRef.current()
    }
    window.addEventListener('keydown', onKeyDown)

    // Stránka pod oknem se neposouvá.
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [])

  // Obrázek nejde posunout za okraj rámečku: při měřítku s je největší posun (s − 1) · šířka / 2.
  const fit = (next) => {
    const size = frameRef.current?.clientWidth ?? 0
    const s = clamp(next.s, MIN_ZOOM, MAX_ZOOM)
    const max = ((s - 1) * size) / 2
    return { s, x: clamp(next.x, -max, max), y: clamp(next.y, -max, max) }
  }

  const zoomBy = (factor) => setView((v) => fit({ ...v, s: v.s * factor }))

  const onPointerDown = (e) => {
    const g = gesture.current
    e.currentTarget.setPointerCapture(e.pointerId)
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })
    g.moved = false
    setDragging(true)
    if (g.pointers.size === 2) {
      const [a, b] = [...g.pointers.values()]
      g.pinch = { dist: distance(a, b), s: view.s }
      g.pan = null
    } else {
      g.pan = { px: e.clientX, py: e.clientY, x: view.x, y: view.y }
    }
  }

  const onPointerMove = (e) => {
    const g = gesture.current
    if (!g.pointers.has(e.pointerId)) return
    g.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (g.pointers.size === 2 && g.pinch) {
      const [a, b] = [...g.pointers.values()]
      g.moved = true
      // Hodnoty se čtou hned: až se provede aktualizace stavu, může být gesto už ukončené.
      const s = g.pinch.s * (distance(a, b) / g.pinch.dist)
      setView((v) => fit({ ...v, s }))
    } else if (g.pan) {
      const dx = e.clientX - g.pan.px
      const dy = e.clientY - g.pan.py
      if (Math.hypot(dx, dy) > 6) g.moved = true
      const { x, y } = g.pan
      if (view.s > 1) setView((v) => fit({ ...v, x: x + dx, y: y + dy }))
    }
  }

  const onPointerEnd = (e) => {
    const g = gesture.current
    if (!g.pointers.has(e.pointerId)) return
    g.pointers.delete(e.pointerId)

    // Po puštění jednoho prstu při pinchi pokračuje posun druhým prstem.
    if (g.pointers.size === 1) {
      const [rest] = [...g.pointers.values()]
      g.pinch = null
      g.pan = { px: rest.x, py: rest.y, x: view.x, y: view.y }
      return
    }
    g.pan = null
    g.pinch = null
    setDragging(false)

    // Dvojité klepnutí / dvojklik přepíná mezi původní velikostí a přiblížením.
    if (e.type === 'pointerup' && !g.moved) {
      const now = performance.now()
      if (now - g.lastTap < DOUBLE_TAP_MS) {
        setView((v) => (v.s > 1 ? { s: 1, x: 0, y: 0 } : fit({ s: DOUBLE_TAP_ZOOM, x: 0, y: 0 })))
        g.lastTap = 0
      } else {
        g.lastTap = now
      }
    }
  }

  const onWheel = (e) => zoomBy(e.deltaY < 0 ? BUTTON_STEP : 1 / BUTTON_STEP)

  const iconButton = `flex size-9 shrink-0 items-center justify-center rounded-lg ${theme.count} transition duration-300 hover:bg-slate-800 hover:brightness-125 focus:outline-none focus-visible:ring-2 ${theme.ring} disabled:pointer-events-none disabled:opacity-30`

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={requestClose}
      className="fixed inset-0 z-50 flex touch-none items-center justify-center bg-slate-950/90 p-4"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl shadow-black/60"
      >
        <div className="mb-3 flex items-center gap-1 pl-1">
          <h3 id="info-modal-title" className={`min-w-0 flex-1 truncate font-display font-semibold ${theme.count}`}>
            {item.name}
          </h3>
          <button
            type="button"
            onClick={() => zoomBy(1 / BUTTON_STEP)}
            disabled={view.s <= MIN_ZOOM}
            aria-label="Oddálit"
            className={iconButton}
          >
            <ZoomOut className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => zoomBy(BUTTON_STEP)}
            disabled={view.s >= MAX_ZOOM}
            aria-label="Přiblížit"
            className={iconButton}
          >
            <ZoomIn className="size-5" aria-hidden="true" />
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="Zavřít nápovědu"
            className={`${iconButton} ${closing ? 'scale-90' : ''}`}
          >
            <motion.svg
              viewBox="0 0 24 24"
              className="size-5"
              initial={{ rotate: 180, scale: 0.5, opacity: 0 }}
              animate={closing ? { rotate: 180, scale: 1.25 } : { rotate: 0, scale: 1, opacity: 1 }}
              transition={closing ? { duration: 0.1 } : { duration: 0.5, ease: 'easeInOut', delay: 0.15 }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </motion.svg>
          </button>
        </div>

        <div
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          onWheel={onWheel}
          className={`relative aspect-square w-full touch-none select-none overflow-hidden rounded-xl border border-slate-800 ${
            view.s > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
          }`}
        >
          <div
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
              transition: dragging ? 'none' : 'transform 0.25s ease-out',
            }}
            className="size-full will-change-transform"
          >
            <img
              src={item.infoImage}
              alt={`Nápověda: ${item.name}`}
              draggable={false}
              className="size-full object-cover"
            />
          </div>
          {/* Text je mimo přibližovaný obrázek, takže zůstává pořád stejně velký. */}
          {item.infoTexts && (
            <div
              className={`pointer-events-none absolute flex ${
                item.infoTextArea === 'right'
                  ? 'right-[6%] top-[22%] w-[58%]'
                  : item.infoTall
                    ? 'bottom-[6%] left-[6%] max-w-[55%]'
                    : 'inset-x-0 top-[56%] justify-center px-[6%]'
              }`}
            >
              <TypedText
                texts={item.infoTexts}
                className={`font-display text-[clamp(0.55rem,2.6vw,0.8rem)] font-normal ${theme.count}`}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

export default InfoModal
