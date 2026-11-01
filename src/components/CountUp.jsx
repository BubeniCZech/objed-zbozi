import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

// Číslo, které při změně plynule dopočítá z předchozí hodnoty na novou.
function CountUp({ value }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced) {
      setShown(value)
      return
    }
    const controls = animate(shown, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => setShown(Math.round(v)),
    })
    return () => controls.stop()
    // `shown` se záměrně nesleduje, animace vždy začíná z aktuálně zobrazené hodnoty.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduced])

  return <span className="tabular-nums">{shown}</span>
}

export default CountUp
