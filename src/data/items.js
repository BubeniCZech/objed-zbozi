// Položky sestavy Roto NT – Otevíravě sklopné kování K / A, základní bezpečnost.
// `id` je pořadové číslo položky (1–17), produkty se doplní postupně.
// Varianty (např. K / A) se uvádějí až u produktu.
// Produkt: `code` = objednací číslo (unikátní), `group` = nadpis tabulky v katalogu,
// `lockPoints` = závěrové body (prázdné, pokud nejsou), `note` = poznámky pod čarou z katalogu.
const osPrevodKonstantni = 'OS převod konstantní, dorn 15 mm'

export const items = [
  {
    id: 1,
    name: 'OS převod',
    products: [
      { code: '376 456', group: osPrevodKonstantni, ffh: '280 – 480', length: 370, handleHeight: 120, lockPoints: '' },
      { code: '284 314', group: osPrevodKonstantni, ffh: '280 – 480', length: 370, handleHeight: 120, lockPoints: '' },
      { code: '259 830', group: osPrevodKonstantni, ffh: '481 – 600', length: 490, handleHeight: 170, lockPoints: '' },
      { code: '259 831', group: osPrevodKonstantni, ffh: '601 – 800', length: 690, handleHeight: 263, lockPoints: '' },
      { code: '259 833', group: osPrevodKonstantni, ffh: '601 – 800', length: 690, handleHeight: 263, lockPoints: '1 E' },
      { code: '259 834', group: osPrevodKonstantni, ffh: '801 – 1000', length: 890, handleHeight: 413, lockPoints: '' },
      { code: '259 836', group: osPrevodKonstantni, ffh: '801 – 1000', length: 890, handleHeight: 413, lockPoints: '1 E' },
      { code: '259 838', group: osPrevodKonstantni, ffh: '1001 – 1200', length: 1090, handleHeight: 513, lockPoints: '1 E' },
      { code: '259 840', group: osPrevodKonstantni, ffh: '1201 – 1400', length: 1290, handleHeight: 563, lockPoints: '1 E' },
      { code: '259 842', group: osPrevodKonstantni, ffh: '1401 – 1600', length: 1490, handleHeight: 563, lockPoints: '1 E' },
      { code: '259 843', group: osPrevodKonstantni, ffh: '1401 – 1600', length: 1490, handleHeight: 563, lockPoints: '2 E' },
      { code: '259 846', group: osPrevodKonstantni, ffh: '1601 – 1800', length: 1690, handleHeight: 563, lockPoints: '2 E' },
      { code: '259 847', group: osPrevodKonstantni, ffh: '1601 – 1800', length: 1690, handleHeight: 1000, lockPoints: '2 E' },
      { code: '259 849', group: osPrevodKonstantni, ffh: '1801 – 2000', length: 1890, handleHeight: 1000, lockPoints: '2 E' },
      { code: '259 851', group: osPrevodKonstantni, ffh: '2001 – 2200', length: 2090, handleHeight: 1000, lockPoints: '2 E' },
      { code: '259 852', group: osPrevodKonstantni, ffh: '2001 – 2200', length: 2090, handleHeight: 1000, lockPoints: '3 E' },
      { code: '259 854', group: osPrevodKonstantni, ffh: '2201 – 2400', length: 2290, handleHeight: 1000, lockPoints: '2 E' },
      { code: '259 855', group: osPrevodKonstantni, ffh: '2201 – 2400', length: 2290, handleHeight: 1000, lockPoints: '3 E' },
    ],
  },
  {
    id: 2,
    name: 'Rohová vedení',
    products: [
      { code: '260 277', group: 'Rohová vedení', name: 'Rohové vedení bezp. třída č.1 / č.2' },
      { code: '260 280', group: 'Rohová vedení', name: 'Zvláštní rohové vedení, krátké' },
    ],
  },
  { id: 3, name: 'Rohové vedení OS', products: [] },
  { id: 4, name: 'Křídlové nůžky', products: [] },
  {
    id: 5,
    name: 'Rohové vedení nůžek',
    products: [
      { code: '260 286', group: 'Rohové vedení nůžek', name: 'Rohové vedení nůžek' },
    ],
  },
  { id: 6, name: 'Rámové nůžky', products: [] },
  { id: 7, name: 'Čep držáku', products: [] },
  { id: 8, name: 'Držák', products: [] },
  { id: 9, name: 'Křídlový závěs', products: [] },
  { id: 10, name: 'Rámové ložisko', products: [] },
  { id: 11, name: 'Střední díl', products: [] },
  { id: 12, name: 'OS rámový uzávěr', products: [] },
  { id: 13, name: 'Rámový uzávěr', products: [] },
  { id: 14, name: 'Úrovňová a ovládací zarážka', products: [] },
  { id: 15, name: 'Západka', products: [] },
  { id: 16, name: 'Druhé nůžky', products: [] },
  { id: 17, name: 'Podložka (profilově závislá)', products: [] },
]
