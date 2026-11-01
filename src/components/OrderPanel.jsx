import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { productSubtitle, productTitle } from '../utils/productTitle.js'
import QuantityControl from './QuantityControl.jsx'

// Řádek objednávky: při otevření panelu naskočí, při odebrání zprůhlední a jeho výška
// se plynule sbalí, takže řádky pod ním se samy zvednou. Odsazení je ve vnitřním
// prvku, aby se animovala jen výška.
const lineVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.25 + Math.min(index, 10) * 0.07 },
  }),
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.2, ease: 'easeOut' },
      height: { duration: 0.3, ease: 'easeInOut' },
    },
  },
}

// Tlačítko odebrat zčervená a křížek se otočí, zatímco se řádek sbaluje.
const removeButtonVariants = {
  exit: { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#f87171' },
}
const removeIconVariants = {
  exit: { rotate: 180, scale: 1.25, transition: { duration: 0.3 } },
}

function OrderPanel({ open, lines, status, onClose, onQuantityChange, onClear, onSend }) {
  const total = lines.reduce((sum, line) => sum + line.qty, 0)
  const [closing, setClosing] = useState(false)

  // Tlačítko Zavřít se nejdřív krátce animuje a až potom se panel zavře.
  const closeWithAnimation = () => {
    setClosing(true)
    setTimeout(() => {
      setClosing(false)
      onClose()
    }, 120)
  }

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <div
      inert={!open}
      className={`fixed inset-0 z-30 ${open ? '' : 'pointer-events-none'}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/60 transition-opacity duration-250 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-label="Objednávka"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-slate-800 bg-slate-950 shadow-2xl transition-transform duration-250 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
          <h2 className="text-lg font-semibold text-emerald-400">
            Objednávka{' '}
            <span className="text-sm font-medium text-slate-400">({total} ks)</span>
          </h2>
          <button
            type="button"
            onClick={closeWithAnimation}
            aria-label="Zavřít"
            className={`flex size-9 items-center justify-center rounded-lg text-emerald-400 transition duration-300 hover:bg-slate-800 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              closing ? 'scale-90' : ''
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              className={`size-5 transition duration-500 ease-in-out ${
                open
                  ? closing
                    ? 'rotate-180 scale-125 duration-100'
                    : 'rotate-0 delay-300'
                  : 'rotate-180 scale-50 opacity-0'
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ul key={open ? 'open' : 'closed'} className="divide-y divide-slate-800">
            <AnimatePresence>
              {lines.map((line, index) => (
                <motion.li
                  key={line.code}
                  custom={index}
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 py-3 sm:grid-cols-[1fr_auto_auto]">
                  <div className="min-w-0">
                    <p className="text-[clamp(0.65rem,3.4vw,0.9rem)] font-semibold text-slate-100 sm:text-sm">
                      {productTitle(line)}
                    </p>
                    <p className="font-display text-xs font-semibold text-lime-400 sm:text-sm">
                      {productSubtitle(line) && (
                        <span className="mr-2 font-sans font-normal text-slate-400">{productSubtitle(line)}</span>
                      )}
                      {line.code}
                    </p>
                  </div>
                  <div className="col-span-2 row-start-2 sm:col-auto sm:row-auto">
                    <QuantityControl
                      value={line.qty}
                      onChange={(qty) => onQuantityChange(line.code, qty)}
                    />
                  </div>
                  <motion.button
                    type="button"
                    variants={removeButtonVariants}
                    onClick={() => onQuantityChange(line.code, 0)}
                    aria-label="Odebrat z objednávky"
                    className="col-start-2 row-start-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 sm:col-auto sm:row-auto"
                  >
                    <motion.svg
                      variants={removeIconVariants}
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </motion.svg>
                  </motion.button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {/* Zpráva o prázdné objednávce se objeví až po sbalení posledního řádku, ať nic neskáče. */}
          {lines.length === 0 && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: { delay: 0.3, duration: 0.35, ease: 'easeOut' },
              }}
              className="overflow-hidden text-center text-slate-400"
            >
              <span className="block py-8">Objednávka je prázdná.</span>
            </motion.p>
          )}
        </div>

        <footer
          key={open ? 'open' : 'closed'}
          style={open ? { animationDelay: '400ms' } : undefined}
          className={`space-y-2 border-t border-slate-800 px-4 py-4 ${open ? 'animate-fade-up' : ''}`}
        >
          {status === 'sent' && (
            <p className="rounded-lg bg-emerald-500/10 px-3 py-2 text-center text-sm font-medium text-emerald-400">
              ✓ Objednávka byla odeslána.
            </p>
          )}
          {status === 'error' && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-center text-sm font-medium text-red-400">
              Odeslání se nepodařilo, zkus to prosím znovu.
            </p>
          )}
          <button
            type="button"
            disabled={lines.length === 0 || status === 'sending'}
            onClick={onSend}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            {status === 'sending' ? 'Odesílám…' : 'Odeslat objednávku'}
          </button>
          <button
            type="button"
            disabled={lines.length === 0}
            onClick={onClear}
            className="w-full rounded-xl py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-200 disabled:opacity-40 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Vyprázdnit objednávku
          </button>
        </footer>
      </aside>
    </div>
  )
}

export default OrderPanel
