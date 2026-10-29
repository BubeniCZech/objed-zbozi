const buttonClass =
  'flex size-7 items-center justify-center rounded-lg border sm:size-8 border-slate-600 bg-slate-800 text-lg leading-none text-slate-200 transition hover:border-emerald-400 hover:text-emerald-400 disabled:opacity-30 disabled:hover:border-slate-600 disabled:hover:text-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'

function QuantityControl({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-1 sm:gap-1.5">
      <button
        type="button"
        aria-label="Ubrat"
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
        className={buttonClass}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label="Množství"
        value={value}
        onFocus={(e) => e.target.select()}
        onChange={(e) => onChange(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)}
        className="h-7 w-10 rounded-lg sm:h-8 sm:w-12 border border-slate-600 bg-slate-800 text-center text-sm font-semibold text-slate-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
      />
      <button
        type="button"
        aria-label="Přidat"
        onClick={() => onChange(value + 1)}
        className={buttonClass}
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl
