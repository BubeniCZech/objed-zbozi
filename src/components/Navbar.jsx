import { useState } from 'react'
import Logo from './Logo.jsx'

// Hamburger menu je zatím skryté, zapnout ho lze přepnutím na true.
const SHOW_MENU = false

function Navbar({ search, onSearchChange, orderCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <a href="/" className="flex shrink-0 items-center gap-2">
          <Logo />
        </a>

        <div className="flex flex-1 justify-end">
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Hledat položku…"
            aria-label="Hledat položku"
            className="w-full max-w-md rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-emerald-500 focus:bg-slate-900 focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        <button
          type="button"
          onClick={onCartClick}
          aria-label={`Objednávka (${orderCount} ks)`}
          className="group relative flex size-10 shrink-0 items-center justify-center rounded-lg text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <svg key={`icon-${orderCount}`} viewBox="0 0 24 24" className={`size-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${orderCount > 0 ? 'animate-pop' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 7l1.5 1.5L8 5.5M4 13l1.5 1.5L8 11.5M4 19l1.5 1.5L8 17.5" />
            <path d="M12 7h8M12 13h8M12 19h8" />
          </svg>
          {orderCount > 0 && (
            <span key={`badge-${orderCount}`} className="animate-pop absolute -right-0.5 -top-0.5 flex min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1 text-xs font-bold leading-5 text-slate-950">
              {orderCount}
            </span>
          )}
        </button>

        {SHOW_MENU && (
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className="flex size-10 shrink-0 items-center justify-center rounded-lg text-emerald-400 hover:bg-slate-800 hover:text-emerald-300 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="relative block h-5 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition duration-500 ease-in-out ${
                menuOpen ? 'top-2.25 rotate-45' : 'top-0.5'
              }`}
            />
            <span
              className={`absolute left-0 top-2.25 h-0.5 w-6 rounded-full bg-current transition duration-500 ease-in-out ${
                menuOpen ? 'scale-x-0 opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition duration-500 ease-in-out ${
                menuOpen ? 'top-2.25 -rotate-45' : 'top-4'
              }`}
            />
          </span>
        </button>
        )}
      </div>

      {SHOW_MENU && (
      <div
        inert={!menuOpen}
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out md:hidden ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-800 bg-slate-950">
            <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-400">
              Menu zatím prázdné
            </div>
          </div>
        </div>
      </div>
      )}
    </nav>
  )
}

export default Navbar
