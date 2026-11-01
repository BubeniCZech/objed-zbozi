// Název produktu: vlastní `name`, jinak název položky a FFH jako u OS převodů.
// Název položky se bere z druhého parametru, nebo z `product.itemName` (řádky objednávky).
export function productTitle(product, itemName = product.itemName) {
  return product.name ?? `${itemName} ${product.ffh} mm`
}

// Podnázev produktu (výška kliky), u produktů s vlastním `name` prázdný.
export function productSubtitle(product) {
  return product.name ? '' : `klika ${product.handleHeight} mm`
}
