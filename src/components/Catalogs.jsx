import { motion } from 'motion/react'
import { ExternalLink, FileText } from 'lucide-react'
import { makeBadgeVariants, makeCardVariants, shineVariants } from '../cardMotion.js'
import { themes } from '../theme.js'

// Stejná animace jako u karet kategorií, jen v oranžové barvě a s decentnějším rámečkem.
// Rámeček má světlejší oranžovou, stejnou jako ikona při najetí (badgeOn).
const cardVariants = makeCardVariants('253, 186, 116', true)
const badgeVariants = makeBadgeVariants(themes.katalogy)

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
        <span className="h-5 w-1 rounded-full bg-orange-500" aria-hidden="true" />
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
            <motion.a
              href={`${catalog.file}?v=${catalog.version}`}
              target="_blank"
              rel="noopener"
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.3 }}
              className="group relative flex items-center gap-3 overflow-hidden rounded-xl border bg-slate-900/70 px-3 py-2.5 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
            >
              <motion.span
                aria-hidden="true"
                variants={shineVariants}
                style={{ skewX: -12 }}
                className="pointer-events-none absolute -inset-y-2 left-0 w-1/4 bg-linear-to-r from-transparent via-white/15 to-transparent"
              />
              <motion.span
                variants={badgeVariants}
                className="relative flex size-8 shrink-0 items-center justify-center"
              >
                <FileText className="size-5" aria-hidden="true" />
              </motion.span>
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
                className="size-5 shrink-0 text-slate-600 transition-colors duration-300 group-hover:text-orange-300"
                aria-hidden="true"
              />
            </motion.a>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default Catalogs
