import { motion } from 'motion/react'

// Stavy animace: "rest" (klid), "hover" (myš nad kartou) a "tap" (dotyk / stisk).
// Dotyk funguje i na mobilu, na rozdíl od CSS :hover. Děti dědí název stavu od karty.
const glow = {
  borderColor: 'rgba(5, 150, 105, 0.75)',
  boxShadow: '0 0 20px rgba(5, 150, 105, 0.25)',
}

const cardVariants = {
  rest: {
    scale: 1,
    borderColor: 'rgba(30, 41, 59, 1)',
    boxShadow: '0 0 0 rgba(16, 185, 129, 0)',
  },
  hover: { scale: 1.02, ...glow },
  tap: { scale: 0.97, ...glow },
}

const shine = { x: '450%', transition: { duration: 0.7, ease: 'easeOut' } }
const shineVariants = {
  rest: { x: '-100%', transition: { duration: 0 } },
  hover: shine,
  tap: shine,
}

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
  tap: { scale: 1.06 },
}

const overlayOn = { backgroundColor: 'rgba(0, 0, 0, 0.1)' }
const overlayVariants = {
  rest: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  hover: overlayOn,
  tap: overlayOn,
}

// Ikona se při hoveru jen zesvětlí, stejně jako počet vpravo, bez pohybu a svitu.
const badgeOn = { color: '#6ee7b7' }
const badgeVariants = {
  rest: { color: '#34d399' },
  hover: badgeOn,
  tap: badgeOn,
}

const countOn = { color: '#6ee7b7' }
const countVariants = {
  rest: { color: '#94a3b8' },
  hover: countOn,
  tap: countOn,
}

// `badge` a `count` jdou přepsat (karty kategorií), jinak se bere číslo a počet produktů položky.
// Když má položka `image`, zobrazí se vlevo jako náhled a popis s ikonou je vpravo.
function ItemCard({ item, onSelect, badge = item.id, count = item.products.length }) {
  const hasImage = Boolean(item.image)

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item.id)}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3 }}
      className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl border bg-slate-900/70 px-3 text-left backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${hasImage ? 'py-2' : 'py-2.5'}`}
    >
      {hasImage && (
        <span className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-slate-800">
          <motion.img
            src={item.image}
            alt=""
            aria-hidden="true"
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            className="pointer-events-none size-full object-cover"
          />
          {/* černý overlay, který se při hoveru zesvětlí */}
          <motion.span
            aria-hidden="true"
            variants={overlayVariants}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0"
          />
        </span>
      )}

      {/* světelný záblesk, který přejede šikmo přes kartu (u karet s obrázkem se nepoužívá) */}
      {!hasImage && (
        <motion.span
          aria-hidden="true"
          variants={shineVariants}
          style={{ skewX: -12 }}
          className="pointer-events-none absolute -inset-y-2 left-0 w-1/4 bg-linear-to-r from-transparent via-white/15 to-transparent"
        />
      )}

      <motion.span
        variants={badgeVariants}
        className="relative flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
      >
        {badge}
      </motion.span>
      <span className="relative min-w-0 flex-1 text-[clamp(0.8rem,calc((100cqw-5.5rem)/17),1.05rem)] font-medium leading-tight text-slate-100 wrap-break-word hyphens-auto">
        {item.name}
      </span>
      <motion.span
        variants={countVariants}
        className="relative shrink-0 text-xs font-medium"
      >
        {count === 0 ? '—' : count}
      </motion.span>
    </motion.button>
  )
}

export default ItemCard
