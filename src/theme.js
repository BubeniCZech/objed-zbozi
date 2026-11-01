// Barevná témata sekcí. Třídy jsou zapsané celé, aby je Tailwind našel při sestavení.
// `rgb` se používá pro záři a rámeček karet, `badge` a `badgeOn` pro ikonu (klid / hover).
export const themes = {
  prislusenstvi: {
    rgb: '5, 150, 105',
    badge: '#34d399',
    badgeOn: '#6ee7b7',
    bar: 'bg-emerald-500',
    gradient: 'from-emerald-400 via-emerald-600 to-emerald-400',
    count: 'text-emerald-400',
    ring: 'focus-visible:ring-emerald-500',
  },
  dverni: {
    rgb: '124, 58, 237',
    badge: '#a78bfa',
    badgeOn: '#c4b5fd',
    bar: 'bg-violet-500',
    gradient: 'from-violet-400 via-violet-600 to-violet-400',
    count: 'text-violet-400',
    ring: 'focus-visible:ring-violet-500',
  },
  okenni: {
    rgb: '2, 132, 199',
    badge: '#38bdf8',
    badgeOn: '#7dd3fc',
    bar: 'bg-sky-500',
    gradient: 'from-sky-400 via-sky-600 to-sky-400',
    count: 'text-sky-400',
    ring: 'focus-visible:ring-sky-500',
  },
  katalogy: {
    rgb: '234, 88, 12',
    badge: '#fb923c',
    badgeOn: '#fdba74',
    bar: 'bg-orange-500',
    gradient: 'from-orange-400 via-orange-600 to-orange-400',
    count: 'text-orange-400',
    ring: 'focus-visible:ring-orange-500',
  },
}

// Výchozí téma, když kategorie není známa (úvodní přehled).
export const defaultTheme = themes.prislusenstvi
