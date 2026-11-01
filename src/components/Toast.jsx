import { useEffect, useRef } from 'react'
import { productSubtitle, productTitle } from '../utils/productTitle.js'

const AUTO_CLOSE_MS = 3000

// Krátké potvrzení (přidání do objednávky, odeslání objednávky). `notice.title` je text hlášky,
// `notice.lines` jsou produkty (nepovinné), `notice.duration` doba zobrazení v ms. Zmizí samo po 3 sekundách
// nebo po kliknutí kamkoli mimo něj.
function Toast({ notice, onClose }) {
  const toastRef = useRef(null)
  const onCloseRef = useRef(onClose)

  // onClose se v rodiči vytváří při každém renderu, proto ho držíme v refu,
  // aby se kvůli němu časovač nerestartoval.
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!notice) return

    const timer = setTimeout(() => onCloseRef.current(), notice.duration ?? AUTO_CLOSE_MS)
    const onPointerDown = (e) => {
      if (!toastRef.current?.contains(e.target)) onCloseRef.current()
    }
    document.addEventListener('pointerdown', onPointerDown)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [notice])

  if (!notice) return null

  return (
    <div
      ref={toastRef}
      key={notice.id}
      role="status"
      className="animate-fade-up fixed inset-x-4 top-20 z-20 rounded-xl border border-emerald-500/40 bg-slate-900 p-4 shadow-xl shadow-black/50 sm:left-auto sm:right-4 sm:w-96"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
          <span aria-hidden="true">✓</span> {notice.title ?? 'Přidáno do objednávky'}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Zavřít"
          className="-mr-1 -mt-1 flex size-6 items-center justify-center rounded text-slate-400 hover:text-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          ✕
        </button>
      </div>
      {notice.lines?.length > 0 && (
      <ul className="mt-2 max-h-[45vh] space-y-1 overflow-y-auto text-sm text-slate-300">
        {notice.lines.map((line) => (
          <li key={line.code} className="flex justify-between gap-3">
            <span>
              <span className="block font-semibold text-slate-100">
                {productTitle(line)}
              </span>
              <span className="block font-display text-xs font-semibold text-lime-400">
                {productSubtitle(line) && (
                  <span className="mr-2 font-sans font-normal text-slate-400">{productSubtitle(line)}</span>
                )}
                {line.code}
              </span>
            </span>
            <span className="shrink-0 font-semibold text-slate-100">{line.qty} ks</span>
          </li>
        ))}
      </ul>
      )}
    </div>
  )
}

export default Toast
