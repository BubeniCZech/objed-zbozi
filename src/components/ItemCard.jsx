import { motion } from 'motion/react'

// Stavy animace: "rest" (klid), "hover" (myš nad kartou) a "tap" (dotyk / stisk).
// Dotyk funguje i na mobilu, na rozdíl od CSS :hover. Děti dědí název stavu od karty.
const glow = {
  borderColor: 'rgba(52, 211, 153, 0.7)',
  boxShadow: '0 0 22px rgba(16, 185, 129, 0.3)',
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

const badgeOn = { rotate: 6, scale: 1.1, backgroundColor: '#059669', color: '#ffffff' }
const badgeVariants = {
  rest: { rotate: 0, scale: 1, backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399' },
  hover: badgeOn,
  tap: badgeOn,
}

const countOn = { color: '#6ee7b7' }
const countVariants = {
  rest: { color: '#94a3b8' },
  hover: countOn,
  tap: countOn,
}

function ItemCard({ item, onSelect }) {
  const count = item.products.length

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item.id)}
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.3 }}
      className="relative flex w-full items-center gap-3 overflow-hidden rounded-xl border bg-slate-900/70 px-3 py-2.5 text-left backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
    >
      {/* světelný záblesk, který přejede šikmo přes kartu */}
      <motion.span
        aria-hidden="true"
        variants={shineVariants}
        style={{ skewX: -12 }}
        className="pointer-events-none absolute -inset-y-2 left-0 w-1/4 bg-linear-to-r from-transparent via-white/15 to-transparent"
      />

      <motion.span
        variants={badgeVariants}
        className="relative flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-semibold"
      >
        {item.id}
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
