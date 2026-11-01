// Tlačítko „Zpět“ vpravo nad obsahem.
function BackButton({ onClick, children }) {
  return (
    <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={onClick}
          className="group inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 py-1.5 pl-3 pr-4 text-sm font-semibold text-emerald-400 transition duration-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-[0_0_16px_rgba(16,185,129,0.25)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 transition-transform duration-300 ease-out group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          {children}
        </button>
    </div>
  )
}

export default BackButton
