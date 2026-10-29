// Popis produktu: vlastní `name`, jinak rozměry (FFH a výška kliky) jako u OS převodů.
export function productTitle(product) {
  return product.name ?? `${product.ffh} mm · kliky ${product.handleHeight} mm`
}
