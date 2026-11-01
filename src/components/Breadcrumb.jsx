import { ChevronLeft, ChevronRight } from 'lucide-react'
import { animate, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

const FADE = '1rem'

// Drobečková navigace. Každá úroveň kromě poslední je odkaz (`onClick`), poslední je aktuální stránka.
// Vždy zůstává na jednom řádku. Když se nevejde, vyhradí se po stranách místo pro šipky (nepřekrývají
// text), cesta se posune doleva, aby byla vidět poslední úroveň, a okraje, za kterými je ještě obsah, zbledou.
function Breadcrumb({ crumbs }) {
  const navRef = useRef(null)
  const listRef = useRef(null)
  const animation = useRef(null)
  const [state, setState] = useState({ overflow: false, left: false, right: false })

  const update = () => {
    const nav = navRef.current
    const list = listRef.current
    if (!nav || !list) return
    // Přetékání se měří proti celé šířce, ne proti seznamu, který se zúží o místo pro šipky.
    // Díky tomu se stav nepřepíná sem a tam.
    const overflow = list.scrollWidth > nav.clientWidth + 1
    const left = overflow && list.scrollLeft > 1
    const right = overflow && list.scrollWidth - list.clientWidth - list.scrollLeft > 1
    setState((prev) =>
      prev.overflow === overflow && prev.left === left && prev.right === right
        ? prev
        : { overflow, left, right },
    )
  }

  // Plynulý posun vlastní animací. Cíl se počítá v každém snímku, protože se při zobrazení šipek mění šířka seznamu.
  const scrollTo = (getTarget) => {
    const list = listRef.current
    if (!list) return
    animation.current?.stop()
    const from = list.scrollLeft
    animation.current = animate(0, 1, {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (progress) => {
        const max = Math.max(0, list.scrollWidth - list.clientWidth)
        const to = Math.max(0, Math.min(getTarget(list), max))
        list.scrollLeft = from + (to - from) * progress
      },
    })
  }

  const key = crumbs.map((crumb) => crumb.label).join('/')

  // Při změně cesty se doscrolluje na konec, kde je aktuální stránka.
  useEffect(() => {
    update()
    scrollTo((list) => list.scrollWidth)
    return () => animation.current?.stop()
  }, [key])

  useEffect(() => {
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Šipky posouvají drobečky o ~60 % šířky, takže jdou projít i myší.
  const scrollBy = (direction) => {
    const start = listRef.current?.scrollLeft ?? 0
    scrollTo((list) => start + direction * list.clientWidth * 0.6)
  }

  const mask = `linear-gradient(to right, ${state.left ? 'transparent' : '#000'}, #000 ${FADE}, #000 calc(100% - ${FADE}), ${state.right ? 'transparent' : '#000'})`

  const arrowClass =
    'flex size-6 shrink-0 items-center justify-center rounded text-emerald-400 hover:text-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'

  // Šipka drží své místo, jen se plynule zobrazí nebo schová, aby se seznam neposouval.
  const arrow = (side, visible, Icon, label, direction) => (
    <motion.button
      type="button"
      onClick={() => scrollBy(direction)}
      aria-label={label}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      className={`${arrowClass} ${visible ? '' : 'pointer-events-none'}`}
      data-side={side}
    >
      <Icon className="size-5" aria-hidden="true" />
    </motion.button>
  )

  return (
    <nav ref={navRef} aria-label="Drobečková navigace" className="mb-4 flex items-center">
      {state.overflow && arrow('left', state.left, ChevronLeft, 'Posunout doleva', -1)}
      <ol
        ref={listRef}
        onScroll={update}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
        className="flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-x-auto whitespace-nowrap py-1 text-sm scrollbar-none"
      >
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1
          return (
            <li key={crumb.label} className="flex shrink-0 items-center gap-1">
              {index > 0 && (
                <ChevronRight className="size-4 shrink-0 text-slate-600" aria-hidden="true" />
              )}
              {last ? (
                <span aria-current="page" className="font-semibold text-slate-200">
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
      {state.overflow && arrow('right', state.right, ChevronRight, 'Posunout doprava', 1)}
    </nav>
  )
}

export default Breadcrumb
