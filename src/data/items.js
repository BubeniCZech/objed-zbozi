// Položky sestavy Roto NT – Otevíravě sklopné kování K / A, základní bezpečnost.
// `id` je pořadové číslo položky (1–18), produkty se doplní postupně.
// `infoImage` = obrázek nápovědy, který se rozbalí pod názvem položky (ikona info), `infoTexts` = texty, které se na něm střídavě píšou.
// Varianty (např. K / A) se uvádějí až u produktu.
// `productName` = jednotné číslo názvu, které je v názvu produktu (když se liší od `name`).
// Produkt: `code` = objednací číslo (unikátní), `group` = nadpis tabulky v katalogu,
// `lockPoints` = závěrové body (prázdné, pokud nejsou), `note` = poznámky pod čarou z katalogu.
const osPrevodKonstantni = 'OS převody konstantní, dorn 15 mm'

export const items = [
  {
    id: 1,
    name: 'OS převody',
    productName: 'OS převod',
    infoImage: '/kovani/os-prevod-dark.webp',
    infoTexts: ['OS převody od 280 mm do 2400 mm', 'Klika od 120 mm do 1000 mm'],
    products: [
      { code: '376456', group: osPrevodKonstantni, ffh: '280 – 480', length: 370, handleHeight: 120, lockPoints: '' },
      { code: '259830', group: osPrevodKonstantni, ffh: '481 – 600', length: 490, handleHeight: 170, lockPoints: '' },
      { code: '259831', group: osPrevodKonstantni, ffh: '601 – 800', length: 690, handleHeight: 263, lockPoints: '' },
      { code: '259834', group: osPrevodKonstantni, ffh: '801 – 1000', length: 890, handleHeight: 413, lockPoints: '' },
      { code: '259838', group: osPrevodKonstantni, ffh: '1001 – 1200', length: 1090, handleHeight: 513, lockPoints: '1 E' },
      { code: '259840', group: osPrevodKonstantni, ffh: '1201 – 1400', length: 1290, handleHeight: 563, lockPoints: '1 E' },
      { code: '259842', group: osPrevodKonstantni, ffh: '1401 – 1600', length: 1490, handleHeight: 563, lockPoints: '1 E' },
      { code: '259846', group: osPrevodKonstantni, ffh: '1601 – 1800', length: 1690, handleHeight: 563, lockPoints: '2 E' },
      { code: '259849', group: osPrevodKonstantni, ffh: '1801 – 2000', length: 1890, handleHeight: 1000, lockPoints: '2 E' },
      { code: '259851', group: osPrevodKonstantni, ffh: '2001 – 2200', length: 2090, handleHeight: 1000, lockPoints: '2 E' },
      { code: '259854', group: osPrevodKonstantni, ffh: '2201 – 2400', length: 2290, handleHeight: 1000, lockPoints: '2 E' },
    ],
  },
  {
    id: 2,
    name: 'Štulpové převody',
    productName: 'Štulpový převod',
    // Zatím stejné rozměry jako OS převody, `code` jsou zástupná čísla, která se nahradí skutečnými.
    products: [
      { code: 'STULP-01', group: 'Štulpové převody', ffh: '280 – 480', length: 370, handleHeight: 120, lockPoints: '' },
      { code: 'STULP-02', group: 'Štulpové převody', ffh: '481 – 600', length: 490, handleHeight: 170, lockPoints: '' },
      { code: 'STULP-03', group: 'Štulpové převody', ffh: '601 – 800', length: 690, handleHeight: 263, lockPoints: '' },
      { code: 'STULP-04', group: 'Štulpové převody', ffh: '801 – 1000', length: 890, handleHeight: 413, lockPoints: '' },
      { code: 'STULP-05', group: 'Štulpové převody', ffh: '1001 – 1200', length: 1090, handleHeight: 513, lockPoints: '1 E' },
      { code: 'STULP-06', group: 'Štulpové převody', ffh: '1201 – 1400', length: 1290, handleHeight: 563, lockPoints: '1 E' },
      { code: 'STULP-07', group: 'Štulpové převody', ffh: '1401 – 1600', length: 1490, handleHeight: 563, lockPoints: '1 E' },
      { code: 'STULP-08', group: 'Štulpové převody', ffh: '1601 – 1800', length: 1690, handleHeight: 563, lockPoints: '2 E' },
      { code: 'STULP-09', group: 'Štulpové převody', ffh: '1801 – 2000', length: 1890, handleHeight: 1000, lockPoints: '2 E' },
      { code: 'STULP-10', group: 'Štulpové převody', ffh: '2001 – 2200', length: 2090, handleHeight: 1000, lockPoints: '2 E' },
      { code: 'STULP-11', group: 'Štulpové převody', ffh: '2201 – 2400', length: 2290, handleHeight: 1000, lockPoints: '2 E' },
    ],
  },
  {
    id: 3,
    name: 'Rohová vedení',
    products: [
      { code: '260277', group: 'Rohová vedení', name: 'Rohové vedení bezp. třída č.1 / č.2' },
      { code: '260280', group: 'Rohová vedení', name: 'Zvláštní rohové vedení, krátké' },
    ],
  },
  { id: 4, name: 'Rohové vedení OS', products: [] },
  { id: 5, name: 'Křídlové nůžky', products: [] },
  {
    id: 6,
    name: 'Rohové vedení nůžek',
    products: [
      { code: '260286', group: 'Rohové vedení nůžek', name: 'Rohové vedení nůžek' },
    ],
  },
  { id: 7, name: 'Rámové nůžky', products: [] },
  { id: 8, name: 'Čep držáku', products: [] },
  { id: 9, name: 'Držák', products: [] },
  { id: 10, name: 'Křídlový závěs', products: [] },
  { id: 11, name: 'Rámové ložisko', products: [] },
  { id: 12, name: 'Střední díl', products: [] },
  { id: 13, name: 'OS rámový uzávěr', products: [] },
  { id: 14, name: 'Rámový uzávěr', products: [] },
  { id: 15, name: 'Úrovňová a ovládací zarážka', products: [] },
  { id: 16, name: 'Západka', products: [] },
  { id: 17, name: 'Druhé nůžky', products: [] },
  { id: 18, name: 'Podložka (profilově závislá)', products: [] },
]

// Položky dveřního kování, produkty se doplní postupně.
const dverniItems = [
  { id: 1, name: 'Dveřní závěrové systémy', products: [] },
  { id: 2, name: 'Závěsy', products: [] },
  { id: 3, name: 'Podlahové prahy', products: [] },
]

// Hlavní kategorie na úvodní stránce. Produkty zatím má jen okenní kování.
export const categories = [
  { id: 'okenni', name: 'Okenní kování', items },
  { id: 'dverni', name: 'Dveřní kování', items: dverniItems },
  { id: 'prislusenstvi', name: 'Příslušenství', items: [] },
]
