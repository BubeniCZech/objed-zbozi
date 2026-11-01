import { defaultTheme } from '../theme.js'

const buttonClass =
  'flex h-full w-7 items-center justify-center text-lg leading-none text-slate-400 transition duration-200 disabled:pointer-events-none disabled:opacity-30 focus:outline-none sm:w-8'

// Ovladač množství jako jedno tělo: − [číslo] +. Při množství nad 0 se orámování i číslo obarví barvou sekce.
function QuantityControl({ value, onChange, theme = defaultTheme }) {
  const active = value > 0

  return (
    <div
      className={`inline-flex h-7 items-stretch overflow-hidden rounded-xl border transition-colors duration-200 sm:h-8 ${
        active
          ? theme.qtyActive
          : 'border-slate-700 bg-slate-900'
      } focus-within:ring-2 ${theme.qtyFocus}`}
    >
      <button
        type="button"
        aria-label="Ubrat"
        disabled={value === 0}
        onClick={() => onChange(value - 1)}
        className={`${buttonClass} ${theme.qtyButton}`}
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
          active ? theme.qtyValue : 'text-slate-500'
        }`}
      />
      <button
        type="button"
        aria-label="Přidat"
        onClick={() => onChange(value + 1)}
        className={`${buttonClass} ${theme.qtyButton}`}
      >
        +
      </button>
    </div>
  )
}

export default QuantityControl
