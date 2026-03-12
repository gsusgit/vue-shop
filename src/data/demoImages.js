/**
 * Resuelve las URLs de las imágenes demo en src/assets/images/demo/
 * para usarlas al importar el contenido demo (Vite las sirve con la ruta correcta).
 */
const modules = import.meta.glob('../assets/images/demo/product*.jpg', {
  eager: true,
  query: '?url',
  import: 'default'
})

const sortedUrls = Object.entries(modules)
  .sort((a, b) => {
    const numA = parseInt(a[0].match(/product(\d+)/)?.[1] ?? '0', 10)
    const numB = parseInt(b[0].match(/product(\d+)/)?.[1] ?? '0', 10)
    return numA - numB
  })
  .map(([, url]) => url)

export function getDemoImageUrl(index) {
  return sortedUrls[index] ?? ''
}

export const demoImageCount = sortedUrls.length
