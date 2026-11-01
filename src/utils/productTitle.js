// Název produktu: vlastní `name`, jinak název položky a FFH jako u OS převodů.
// Název položky se bere z druhého parametru, nebo z `product.itemName` (řádky objednávky).
export function productTitle(product, itemName = product.itemName) {
  return product.name ?? `${itemName} ${product.ffh} mm`
}

// Podnázev produktu: vlastní `subtitle`, jinak výška kliky; u produktů s vlastním `name` bez `subtitle` prázdný.
export function productSubtitle(product) {
  if (product.subtitle) return product.subtitle
  return product.name ? '' : `klika ${product.handleHeight} mm`
}
