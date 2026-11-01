// Položky sestavy Roto NT – Otevíravě sklopné kování K / A, základní bezpečnost.
// `id` je pořadové číslo položky (1–18), produkty se doplní postupně.
// `infoImage` = obrázek nápovědy, který se rozbalí pod názvem položky (ikona info), `infoTextArea: 'right'` = text v pravé části obrázku, `infoTall` = obrázek na výšku (text vlevo dole), `infoTexts` = texty, které se na něm střídavě píšou.
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
    infoTexts: [
      'OS převod je hlavní ovládací prvek kování otevíravě-sklopného okna.',
      'Přenáší pohyb z kliky na uzamykací body po obvodu křídla, takže umožňuje okno zavřít, otevřít a sklopit.',
    ],
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
    infoImage: '/kovani/stulpove-prevody.webp',
    infoTexts: [
      'Štulpový převod je dlouhá plochá lišta kování, která se zapouští do štulpové drážky po obvodu křídla.',
      'Spojuje kliku s uzamykacími body, takže otočením kliky se okno zamkne, odemkne nebo sklopí.',
      'Při výběru je důležitá délka podle výšky křídla, rozteč kliky a výrobce kování, protože díly různých systémů nejsou zaměnitelné.',
    ],
    // Zatím stejné rozměry jako OS převody, `code` jsou zástupná šestimístná čísla (9990xx), která se nahradí skutečnými.
    products: [
      { code: '999001', group: 'Štulpové převody', ffh: '280 – 480', length: 370, handleHeight: 120, lockPoints: '' },
      { code: '999002', group: 'Štulpové převody', ffh: '481 – 600', length: 490, handleHeight: 170, lockPoints: '' },
      { code: '999003', group: 'Štulpové převody', ffh: '601 – 800', length: 690, handleHeight: 263, lockPoints: '' },
      { code: '999004', group: 'Štulpové převody', ffh: '801 – 1000', length: 890, handleHeight: 413, lockPoints: '' },
      { code: '999005', group: 'Štulpové převody', ffh: '1001 – 1200', length: 1090, handleHeight: 513, lockPoints: '1 E' },
      { code: '999006', group: 'Štulpové převody', ffh: '1201 – 1400', length: 1290, handleHeight: 563, lockPoints: '1 E' },
      { code: '999007', group: 'Štulpové převody', ffh: '1401 – 1600', length: 1490, handleHeight: 563, lockPoints: '1 E' },
      { code: '999008', group: 'Štulpové převody', ffh: '1601 – 1800', length: 1690, handleHeight: 563, lockPoints: '2 E' },
      { code: '999009', group: 'Štulpové převody', ffh: '1801 – 2000', length: 1890, handleHeight: 1000, lockPoints: '2 E' },
      { code: '999010', group: 'Štulpové převody', ffh: '2001 – 2200', length: 2090, handleHeight: 1000, lockPoints: '2 E' },
      { code: '999011', group: 'Štulpové převody', ffh: '2201 – 2400', length: 2290, handleHeight: 1000, lockPoints: '2 E' },
    ],
  },
  {
    id: 3,
    name: 'Rohová vedení',
    infoImage: '/kovani/rohove-vedeni.webp',
    // Produkt zabírá levý a spodní okraj, text se píše do prázdné pravé horní části.
    infoTextArea: 'right',
    infoTexts: [
      'Rohové vedení (též rohový přenos) je součást okenního kování, která přenáší pohyb převodu z boční svislé strany křídla do horní vodorovné strany.',
      'Díky tomu se jedním otočením kliky ovládají všechny uzamykací body po celém obvodu křídla.',
      'Při výběru je důležitá strana otevírání, rozměr a typ kování, protože díly různých výrobců (Maco, Roto, Winkhaus, Siegenia) nejsou zaměnitelné.',
    ],
    products: [
      { code: '260277', group: 'Rohová vedení', name: 'Rohové vedení' },
      { code: '260280', group: 'Rohová vedení', name: 'Zvláštní rohové vedení, krátké' },
    ],
  },
  {
    id: 4,
    name: 'Rohové vedení nůžek',
    infoImage: '/kovani/rohove-vedeni-nuzek.webp',
    // Obrázek na výšku: text se píše vlevo dole, mimo produkt (jinak je pod produktem uprostřed).
    infoTall: true,
    infoTexts: [
      'Rohové vedení nůžek je součást kování, která vede pohyb z převodu přes roh křídla na horní vodorovnou stranu.',
      'Umožňuje tak ovládat uzamykací body a nůžky i na horní hraně okna jedním pohybem kliky.',
      'Při výběru je důležitá velikost podle šířky a výšky křídla, správná strana otevírání a typ kování od konkrétního výrobce, protože díly různých systémů nejsou zaměnitelné.',
    ],
    products: [
      { code: '260286', group: 'Rohové vedení nůžek', name: 'Rohové vedení nůžek' },
    ],
  },
  {
    id: 5,
    name: 'Křídlové nůžky',
    infoImage: '/kovani/kridlove-nuzky.webp',
    infoTexts: [
      'Křídlové nůžky jsou součást otevíravě-sklopného kování, která drží horní část křídla při sklopení a vede ho při otevírání.',
      'Připojují se k rámu v horním rohu a při sklopení umožňují, aby se křídlo nahoře odklonilo od rámu a zůstalo bezpečně zajištěné.',
      'Při výběru je důležitá velikost podle šířky křídla, strana otevírání a typ kování od konkrétního výrobce, protože díly různých systémů nejsou zaměnitelné.',
    ],
    // Kód 787362 platí pro obě poslední řady výšky křídla (1201–1400 i 1401–1600 mm), proto jsou sloučené.
    products: [
      { code: '787345', group: 'Křídlové nůžky', name: 'Křídlové nůžky', subtitle: 'výška křídla 320 – 410 mm' },
      { code: '787346', group: 'Křídlové nůžky', name: 'Křídlové nůžky', subtitle: 'výška křídla 411 – 600 mm' },
      { code: '787347', group: 'Křídlové nůžky', name: 'Křídlové nůžky', subtitle: 'výška křídla 601 – 800 mm' },
      { code: '787360', group: 'Křídlové nůžky', name: 'Křídlové nůžky', subtitle: 'výška křídla 801 – 1000 mm' },
      { code: '787361', group: 'Křídlové nůžky', name: 'Křídlové nůžky', subtitle: 'výška křídla 1001 – 1200 mm' },
      { code: '787362', group: 'Křídlové nůžky', name: 'Křídlové nůžky', subtitle: 'výška křídla 1201 – 1600 mm' },
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
