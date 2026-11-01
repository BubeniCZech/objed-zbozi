const buttonClass =
  'flex h-full w-7 items-center justify-center text-lg leading-none text-slate-400 transition duration-200 hover:bg-emerald-500/15 hover:text-emerald-300 active:bg-emerald-500/25 disabled:pointer-events-none disabled:opacity-30 focus:outline-none focus-visible:bg-emerald-500/15 focus-visible:text-emerald-300 sm:w-8'

// Ovladač množství jako jedno tělo: − [číslo] +. Při množství nad 0 se orámování i číslo zazelenají.
function QuantityControl({ value, onChange }) {
  const active = value > 0

  return (
    <div
      className={`inline-flex h-7 items-stretch overflow-hidden rounded-xl border transition-colors duration-200 sm:h-8 ${
        active
          ? 'border-emerald-600/70 bg-emerald-500/10'
          : 'border-slate-700 bg-slate-900'
      } focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30`}
    >
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
        className={`w-9 bg-transparent text-center text-sm font-semibold outline-none transition-colors duration-200 sm:w-11 ${
          active ? 'text-emerald-300' : 'text-slate-500'
        }`}
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
