// Text bez diakritiky a velkých písmen ("Rohové" → "rohove"), ať se hledá pohodlně.
const normalize = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

// Bez mezer, aby se "260277" našlo jako "260 277".
const compact = (text) => normalize(text).replace(/\s+/g, '')

// Položka se najde podle názvu, čísla položky, objednacího čísla produktu
// nebo názvu / rozměrů produktu.
export function matchesItem(item, rawQuery) {
  const query = normalize(rawQuery).trim()
  if (!query) return true

  const compactQuery = compact(rawQuery)
  // U krátkých dotazů (1-2 znaky) se produktové údaje neprohledávají, ať nevzniká šum.
  const searchProducts = compactQuery.length >= 3

  if (normalize(item.name).includes(query)) return true
  if (String(item.id) === compactQuery) return true

  return searchProducts && item.products.some(
    (product) =>
      compact(product.code).includes(compactQuery) ||
      normalize(product.name ?? '').includes(query) ||
      normalize(product.ffh ?? '').includes(query),
  )
}
