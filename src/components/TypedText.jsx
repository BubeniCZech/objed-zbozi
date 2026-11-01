import { useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

const TYPE_MS = 55
const HOLD_MS = 1800
const FADE_MS = 450

// Text, který se postupně píše po písmenech, chvíli zůstane, zmizí a začne se psát další v pořadí.
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
      timer = setTimeout(() => setFading(true), HOLD_MS)
    }
    return () => clearTimeout(timer)
  }, [fading, done, count, reduced, text.length, texts.length])

  return (
    <span
      aria-live="off"
      style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}
      className={`relative inline-block whitespace-nowrap ${className}`}
    >
      {/* Neviditelný celý text drží šířku, aby se psaný text neposouval do stran. */}
      <span className="invisible">{text}</span>
      <span className="absolute left-0 top-0">
        {text.slice(0, count)}
        {!reduced && (
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-current" aria-hidden="true" />
        )}
      </span>
    </span>
  )
}

export default TypedText
