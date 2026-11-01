import { AnimatePresence } from 'motion/react'
import { Info } from 'lucide-react'
import { useState } from 'react'
import InfoModal from './InfoModal.jsx'
import { defaultTheme } from '../theme.js'
import { productSubtitle, productTitle } from '../utils/productTitle.js'
import QuantityControl from './QuantityControl.jsx'

const rowGrid = 'grid-cols-[1fr_auto] px-2.5 py-2 sm:px-3'

function ProductList({ item, draft, ordered, onDraftChange, onAddToOrder, theme = defaultTheme }) {
  const groups = [...new Set(item.products.map((p) => p.group))]
  const [infoOpen, setInfoOpen] = useState(false)
  const draftCount = Object.values(draft).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="animate-fade-up @container">
      <h2 className="mb-5 flex items-center gap-3 font-display font-bold text-slate-100">
        <span className={`flex size-8 shrink-0 items-center justify-center text-sm font-semibold ${theme.count}`}>
          {item.id}
        </span>
        {/* Písmo se zmenší podle délky názvu a šířky obrazovky (Fira Code má znak široký ~0,6 em), ať se název vejde na jeden řádek. */}
        <span
          style={{
            fontSize: `clamp(0.8rem, calc((100cqw - ${item.infoImage ? '5.75rem' : '3rem'}) / ${item.name.length * 0.62}), 1.25rem)`,
          }}
          className="min-w-0"
        >
          {item.name}
        </span>
        {item.infoImage && (
          <button
            type="button"
            onClick={() => setInfoOpen(true)}
            aria-haspopup="dialog"
            aria-label="Zobrazit nápovědu"
            className={`ml-auto flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 ${theme.count} ${theme.ring}`}
          >
            <Info className="size-5" aria-hidden="true" />
          </button>
        )}
      </h2>

      <AnimatePresence>
        {infoOpen && item.infoImage && (
          <InfoModal item={item} theme={theme} onClose={() => setInfoOpen(false)} />
        )}
      </AnimatePresence>

      {item.products.length === 0 && (
        <p className="text-slate-400">Zatím bez produktů.</p>
      )}

      {groups.map((group) => (
        <section key={group} className="mb-8">
          {group !== item.name && (
            <h3 className="mb-2 text-sm font-semibold text-slate-400">{group}</h3>
          )}
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 shadow-sm">
            <ul>
              {item.products
                .filter((p) => p.group === group)
                .map((p, index) => (
                  <li
                    key={p.code}
                    style={{ animationDelay: `${Math.min(index, 12) * 35}ms` }}
                    className={`animate-fade-up grid items-center gap-x-3 border-t border-slate-800 first:border-t-0 ${rowGrid} ${
                      draft[p.code] ? theme.row : ''
                    }`}
                  >
                    <span>
                      <span className="block text-[clamp(0.6rem,2.9vw,0.9rem)] font-semibold leading-tight text-slate-100 sm:text-base">
                        {productTitle(p, item.productName ?? item.name)}
                        {p.note && <sup className="ml-1 text-slate-400">{p.note}</sup>}
                      </span>
                      <span className="block font-display text-xs font-semibold text-lime-400 sm:text-sm">
                        {productSubtitle(p) && (
                          <span className="mr-2 font-sans font-normal text-slate-400">{productSubtitle(p)}</span>
                        )}
                        {p.code}
                        {ordered[p.code] > 0 && (
                          <span className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${theme.tag}`}>
                            v objednávce: {ordered[p.code]}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="justify-self-end">
                      <QuantityControl
                        value={draft[p.code] ?? 0}
                        onChange={(qty) => onDraftChange(p.code, qty)}
                        theme={theme}
                      />
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex justify-end">
        <button
          type="button"
          disabled={draftCount === 0}
          onClick={onAddToOrder}
          className={`rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-black/40 transition disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400 disabled:shadow-none focus:outline-none focus-visible:ring-2 ${theme.confirm}`}
        >
          {draftCount === 0
            ? 'Potvrdit'
            : `Potvrdit (${draftCount} ks)`}
        </button>
      </div>
    </div>
  )
}

export default ProductList
