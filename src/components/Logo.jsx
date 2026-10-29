// Logo: okno ze čtyř tabulí (bez pozadí). Tabule se postupně rozsvěcují
// po směru hodinových ručiček, animace je v index.css (.logo-pane).
const panes = [
  { x: 2, y: 2, delay: '0s' },
  { x: 17, y: 2, delay: '0.4s' },
  { x: 17, y: 17, delay: '0.8s' },
  { x: 2, y: 17, delay: '1.2s' },
]

function Logo({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Logo">
      {panes.map((pane) => (
        <rect
          key={`${pane.x}-${pane.y}`}
          x={pane.x}
          y={pane.y}
          width="13"
          height="13"
          rx="1.5"
          className="logo-pane"
          style={{ animationDelay: pane.delay }}
        />
      ))}
    </svg>
  )
}

export default Logo
