import { ChevronRight } from 'lucide-react'

// Drobečková navigace. Každá úroveň kromě poslední je odkaz (`onClick`), poslední je aktuální stránka.
function Breadcrumb({ crumbs }) {
  return (
    <nav aria-label="Drobečková navigace" className="mb-4">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <li key={crumb.label} className="flex items-center gap-1 min-w-0">
              {index > 0 && (
                <ChevronRight className="size-4 shrink-0 text-slate-600" aria-hidden="true" />
              )}
              {last ? (
                <span aria-current="page" className="truncate font-semibold text-slate-200">
                  {crumb.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={crumb.onClick}
                  className="rounded px-1 font-medium text-emerald-500 transition-colors duration-200 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  {crumb.label}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
