import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Pozadí s parallaxem: vrstvy se při scrollování posouvají různou rychlostí.
// Vrstvy jsou vyšší než okno (160vh), takže se při posunu neukáže jejich okraj.
const SCROLL_RANGE = [0, 3000]

function Layer({ scrollY, shift, className, style }) {
  const y = useTransform(scrollY, SCROLL_RANGE, [0, shift])
  return (
    <motion.div
      aria-hidden="true"
      style={{ y, ...style }}
      className={`absolute inset-x-0 -top-[30vh] h-[160vh] ${className}`}
    />
  )
}

function ParallaxBackground() {
  const { scrollY } = useScroll()
  const reduced = useReducedMotion()
  // Při omezeném pohybu se vrstvy nehýbou.
  const k = reduced ? 0 : 1

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* nejpomalejší vrstva: jemná mřížka */}
      <Layer
        scrollY={scrollY}
        shift={-60 * k}
        className="opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      {/* střední vrstva: velká zelená záře vlevo nahoře */}
      <Layer
        scrollY={scrollY}
        shift={-140 * k}
        style={{
          backgroundImage:
            'radial-gradient(40rem 40rem at 12% 22%, rgba(14, 165, 233, 0.16), transparent 70%)',
        }}
      />
      {/* nejrychlejší vrstva: záře vpravo dole */}
      <Layer
        scrollY={scrollY}
        shift={-240 * k}
        style={{
          backgroundImage:
            'radial-gradient(32rem 32rem at 88% 68%, rgba(2, 132, 199, 0.14), transparent 70%)',
        }}
      />
    </div>
  )
}

export default ParallaxBackground
