import { ref, watch } from 'vue'
import { uid } from 'uid'

const STORAGE_KEY = 'vue-shop-mock'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { products: [], sales: [] }
    const data = JSON.parse(raw)
    return {
      products: Array.isArray(data.products) ? data.products : [],
      sales: Array.isArray(data.sales) ? data.sales : []
    }
  } catch {
    return { products: [], sales: [] }
  }
}

const initial = loadFromStorage()

export const products = ref(initial.products)
export const sales = ref(initial.sales)

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      products: products.value,
      sales: sales.value
    }))
  } catch (e) {
    console.warn('mockDb: could not persist to localStorage', e)
  }
}

watch(products, persist, { deep: true })
watch(sales, persist, { deep: true })

export function getProducts() {
  return products.value
}

export function getProduct(id) {
  return products.value.find(p => p.id === id) ?? null
}

export function searchProducts(query) {
  const normalizedQuery = String(query ?? '').trim().toLowerCase()

  if (!normalizedQuery) return products.value

  return products.value.filter(product => {
    const name = String(product.name ?? '').toLowerCase()
    const description = String(product.description ?? '').toLowerCase()

    return name.includes(normalizedQuery) || description.includes(normalizedQuery)
  })
}

export function addProduct(product) {
  const id = product.id ?? uid()
  const entry = { ...product, id }
  products.value.push(entry)
  return id
}

export function updateProduct(id, data) {
  const index = products.value.findIndex(p => p.id === id)
  if (index === -1) return
  products.value[index] = { ...products.value[index], ...data, id }
}

export function removeProduct(id) {
  products.value = products.value.filter(p => p.id !== id)
}

export function getSales() {
  return sales.value
}

export function getSalesByDate(date) {
  if (!date) return []
  return sales.value.filter(s => s.date === date)
}

function getDateValue(date) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date)
  if (!match) return null

  const [, day, month, year] = match.map(Number)
  const value = new Date(year, month - 1, day)

  if (
    value.getFullYear() !== year ||
    value.getMonth() !== month - 1 ||
    value.getDate() !== day
  ) {
    return null
  }

  return value.getTime()
}

export function getSalesByDateRange(startDate, endDate) {
  const start = getDateValue(startDate)
  const end = getDateValue(endDate)

  if (start === null || end === null) return []

  return sales.value.filter(sale => {
    const saleDate = getDateValue(sale.date)
    return saleDate !== null && saleDate >= start && saleDate <= end
  })
}

export function addSale(sale) {
  sales.value.push({ ...sale })
}

export function removeAllSales() {
  sales.value = []
}

/**
 * Replaces products with demo data. Each item in demoProducts should have
 * { name, description, price, stock, category }. imageByIndex(i) returns the image URL for index i.
 */
export function seedDemoProducts(demoProducts, imageByIndex) {
  products.value = demoProducts.map((p, i) => ({
    id: uid(),
    name: p.name,
    description: p.description,
    price: p.price,
    stock: p.stock,
    category: p.category,
    image: typeof imageByIndex === 'function' ? imageByIndex(i) : `/demo/product${i + 1}.jpg`
  }))
}
