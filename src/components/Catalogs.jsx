import { motion } from 'motion/react'
import { ExternalLink, FileText } from 'lucide-react'

// Katalogy ke stažení. Soubory jsou v public/pdf, `size` je jen informativní údaj pro zobrazení.
// `version` se zvýší pokaždé, když se soubor nahradí novým pod stejným názvem. Přidává se do odkazu,
// aby prohlížeč nepoužil starou kopii PDF z paměti.
const catalogs = [
  { name: 'Roto NT', file: '/pdf/Technicky-katalog-kovani-Roto-NT.pdf', size: '14,1 MB', version: 2 },
  { name: 'Roto NX', file: '/pdf/Technicky-katalog-kovani-Roto-NX.pdf', size: '22,3 MB', version: 2 },
]

const TITLE = 'Technický katalog kování'
const subtitle = (catalog) => `${catalog.name} · PDF · ${catalog.size}`

// Písmo se přizpůsobí šířce karty (Fira Code má znak široký ~0,6 em; 8,5 rem je místo pro ikony a okraje),
// aby oba řádky zůstaly na jednom řádku i na úzkém telefonu.
const fit = (chars, max) => `clamp(0.65rem, calc((100cqw - 8.5rem) / ${chars * 0.62}), ${max})`

function Catalogs() {
  return (
    <section aria-labelledby="catalogs-title" className="mt-10">
      <h3
        id="catalogs-title"
        className="mb-4 flex items-center gap-3 font-display text-lg font-bold tracking-wide text-slate-300"
      >
        <span className="h-5 w-1 rounded-full bg-emerald-500" aria-hidden="true" />
        Katalogy kování
      </h3>

      <ul className="grid gap-3 sm:grid-cols-2">
        {catalogs.map((catalog, index) => (
          <motion.li
            key={catalog.file}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
            className="@container"
          >
            <a
              href={`${catalog.file}?v=${catalog.version}`}
              target="_blank"
              rel="noopener"
              className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-emerald-600/75 hover:shadow-[0_0_20px_rgba(5,150,105,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-400 transition-colors duration-300 group-hover:text-emerald-300">
                <FileText className="size-6" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  style={{ fontSize: fit(TITLE.length, '1rem') }}
                  className="block whitespace-nowrap font-semibold text-slate-100"
                >
                  {TITLE}
                </span>
                <span
                  style={{ fontSize: fit(subtitle(catalog).length, '0.875rem') }}
                  className="block whitespace-nowrap text-slate-400"
                >
                  {subtitle(catalog)}
                </span>
              </span>
              <ExternalLink
                className="size-5 shrink-0 text-slate-600 transition-colors duration-300 group-hover:text-emerald-300"
                aria-hidden="true"
              />
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Catalogs
