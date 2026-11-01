// Sdílená animace karet (kategorie, katalogy).
// Stavy animace: "rest" (klid), "hover" (myš nad kartou) a "tap" (dotyk / stisk).
// Dotyk funguje i na mobilu, na rozdíl od CSS :hover. Děti dědí název stavu od karty.
export const makeCardVariants = (rgb) => {
  const glow = {
    borderColor: `rgba(${rgb}, 0.75)`,
    boxShadow: `0 0 20px rgba(${rgb}, 0.25)`,
  }
  return {
    rest: {
      scale: 1,
      borderColor: 'rgba(30, 41, 59, 1)',
      boxShadow: `0 0 0 rgba(${rgb}, 0)`,
    },
    hover: { scale: 1.02, ...glow },
    tap: { scale: 0.97, ...glow },
  }
}

const shine = { x: '450%', transition: { duration: 0.7, ease: 'easeOut' } }
export const shineVariants = {
  rest: { x: '-100%', transition: { duration: 0 } },
  hover: shine,
  tap: shine,
}

// Ikona se při hoveru jen zesvětlí, stejně jako počet vpravo, bez pohybu a svitu.
export const makeBadgeVariants = (theme) => ({
  rest: { color: theme.badge },
  hover: { color: theme.badgeOn },
  tap: { color: theme.badgeOn },
})
