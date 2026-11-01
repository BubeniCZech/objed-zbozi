import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const TYPE_MS = 40
// Doba, po kterou text zůstane po dopsání, roste s jeho délkou, aby se dlouhá věta stihla přečíst.
const holdMs = (length) => 1500 + length * 25
const FADE_MS = 450

// Text (věta), který se postupně píše po písmenech, po dopsání chvíli zůstane, zmizí a začne se psát další věta v pořadí.
// Dlouhý text se zalomí na více řádků.
function TypedText({ texts, className = '' }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [fading, setFading] = useState(false)

  const text = texts[index]
  const done = count >= text.length

  useEffect(() => {
    let timer
    if (fading) {
      timer = setTimeout(() => {
        setFading(false)
        setCount(0)
        setIndex((i) => (i + 1) % texts.length)
      }, FADE_MS)
    } else if (!done) {
      timer = setTimeout(() => setCount(reduced ? text.length : count + 1), reduced ? 0 : TYPE_MS)
    } else {
      timer = setTimeout(() => setFading(true), holdMs(text.length))
    }
    return () => clearTimeout(timer)
  }, [fading, done, count, reduced, text.length, texts.length])

  return (
    <span
      aria-live="off"
      style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}
      className={`relative inline-block max-w-full text-left ${className}`}
    >
      {/* Neviditelný celý text drží velikost i zalomení řádků, aby se psaný text neposouval. */}
      <span className="invisible">{text}</span>
      <span className="absolute left-0 top-0 w-full">
        {text.slice(0, count)}
        {!reduced && (
          <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.15em] animate-pulse bg-current" aria-hidden="true" />
        )}
      </span>
    </span>
  )
}

export default TypedText
