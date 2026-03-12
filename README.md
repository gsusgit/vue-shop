# vue-shop (proyecto formativo)

Mini e-commerce hecho con **Vue 3 + Vite** con dos zonas:

- **Tienda**: catálogo, detalle de producto, favoritos, carrito, cupones y checkout.
- **Backoffice**: CRUD de productos, listado de ventas por fecha y “seeder” para cargar contenido demo.

La idea de este repo es que sirva como **guía práctica** para aprender Vue: composición de componentes, estado con Pinia, rutas con Vue Router, composables, formularios con FormKit y estilos con Tailwind.

## Requisitos

- Node.js (recomendado LTS)
- npm (o yarn si prefieres)

## Arranque rápido

Instala dependencias:

```bash
npm install
```

Levanta el servidor de desarrollo:

```bash
npm run dev
```

Compilar para producción:

```bash
npm run build
```

Previsualizar el build:

```bash
npm run preview
```

## Cómo está montado (mapa mental del proyecto)

Si vienes a estudiarlo, este orden suele funcionar bien:

1) **Entrada de la app** → `src/main.js`
2) **Layout global** → `src/App.vue`
3) **Rutas** → `src/router/index.js`
4) **Estado y “backend”** → `src/stores/*` + `src/data/mockDb.js`
5) **Vistas** → `src/views/**`
6) **Componentes UI** → `src/components/**`
7) **Composables** → `src/composables/**`

### 1) Punto de entrada: `src/main.js`

Aquí se crea la app y se conectan los “plugins” principales:

- **Pinia**: estado global con stores.
- **Vue Router**: navegación por rutas.
- **FormKit**: formularios + validaciones con configuración global (`formkit.config.js`).

### 2) Layout global: `src/App.vue`

`App.vue` monta el “marco” de toda la aplicación:

- Barra de navegación (`NavBar`) y footer (`Footer`)
- Un `Hero` solo en home (`/`)
- `Toast` global para notificaciones
- `RouterView` como “hueco” donde se renderiza la vista actual

Hay una idea formativa interesante: se calcula `isAdminRoute` desde la ruta para cambiar estilos/comportamiento cuando estás en `/backoffice`.

### 3) Rutas: `src/router/index.js`

Las rutas están separadas por intención:

- **Tienda**: `/`, `/product/:id`, `/cart`, `/favourites`
- **Backoffice**: `/backoffice` con **rutas hijas**:
  - `/backoffice/products`
  - `/backoffice/new-product`
  - `/backoffice/edit-product/:id`
  - `/backoffice/import-demo` (carga datos de ejemplo)
  - `/backoffice/sales`

Además se usa **lazy-loading** (imports dinámicos) en varias rutas para practicar división de código.

### 4) “Backend” simulado: `src/data/mockDb.js`

Este proyecto no depende de un backend real. En su lugar hay un módulo que hace de “base de datos”:

- Guarda **productos** y **ventas** en memoria (con `ref`)
- Persiste automáticamente en `localStorage` (clave `vue-shop-mock`)
- Expone funciones tipo DAO: `addProduct`, `updateProduct`, `getSalesByDate`, etc.

Esto es útil formativamente porque te permite practicar arquitectura y estado sin montar APIs.

### 5) Estado global con Pinia: `src/stores/*`

Este repo usa **stores de Pinia en modo setup** (función que devuelve estado/acciones).

- `src/stores/products.js`
  - **Filtrado** por categorías (`selectedCategory`)
  - **Favoritos** persistidos en `localStorage`
  - Operaciones CRUD delegando a `mockDb`
- `src/stores/cart.js`
  - Carrito con `items`, cálculo de `subtotal/taxes/total` usando `watchEffect`
  - Checkout que genera una venta y descuenta stock en `mockDb`
  - Persistencia del carrito en `localStorage`
- `src/stores/voucher.js`
  - Cupones válidos, estado de “aplicando descuento” y recalcular descuentos
  - Ejemplo de store que **depende de otra store** (`useCart`)
- `src/stores/sales.js`
  - Selección de fecha, ventas del día, total del día
  - Borrado global de ventas (útil para reiniciar práctica)

Idea clave: aquí se ve cómo mezclar **estado reactivo + computed + watchers** dentro de una store, y cómo guardar una parte del estado en `localStorage`.

### 6) Composables: `src/composables/*`

Los composables encapsulan lógica reutilizable (sin depender de la UI concreta).

- `useToast.js`: estado global sencillo para mostrar notificaciones (mensaje, tipo, duración).
- `useImage.js`: ejemplo de “subida” de imagen en local usando `FileReader` (convierte a DataURL).
- `useProductsTable.js`: lógica para selección múltiple (select-all / toggle) en tablas del backoffice.

Pista formativa: fíjate en cómo un composable puede devolver **estado + funciones** y ser usado en varias vistas sin duplicar lógica.

### 7) Componentes y vistas

Estructura recomendada para navegar:

- `src/views/shop/*`: pantallas de la tienda (listado, detalle, carrito, favoritos…)
- `src/views/backoffice/*`: pantallas del backoffice (productos, ventas, import demo…)
- `src/components/layout/*`: componentes de layout (navbar, footer, títulos, contenedores)
- `src/components/ui/*`: componentes UI más “de negocio” (producto, cart item, sale item, etc.)

## Formularios: FormKit + config global

En varias vistas (por ejemplo editar/crear producto o el seeder) se usan componentes `<FormKit />` para:

- Validación declarativa (`validation="required"`, mensajes, etc.)
- Unificado de estilos con `formkit.config.js` (clases Tailwind globales)

Esto te permite centrarte en el flujo de datos (submit → store) sin repetir HTML de formularios.

## Estilos: TailwindCSS

- Tailwind está configurado en `tailwind.config.js` (incluye `@tailwindcss/forms`)
- El CSS base está en `src/assets/main.css` (carga la fuente Inter y aplica `font-inter`)

## Datos demo y “seeder”

En el backoffice hay una pantalla de **Import demo content**:

- Toma productos de `src/data/products.js`
- Reemplaza los productos en `mockDb` con `seedDemoProducts(...)`
- Usa imágenes demo mediante `src/data/demoImages.js`

Si quieres que salgan imágenes “reales” en el seeder:

- **Opción A**: coloca 12 imágenes en `src/assets/images/demo/` con el patrón `product1.jpg ... product12.jpg` (recomendado por Vite).
- **Opción B**: coloca imágenes en `public/demo/` (ver instrucciones en `public/demo/README.md`).

## Flujo típico (para entenderlo rápido)

Ejemplo “añadir al carrito”:

- Vista/Componente UI emite el evento o llama a la acción
- Store `cart` actualiza `items`
- `watchEffect` recalcula totales y el cupón se recalcula
- `watch(items)` persiste en `localStorage`
- La UI reacciona automáticamente al estado

Ejemplo “checkout”:

- `cart.checkOut()` crea una venta (con fecha + invoice)
- Guarda venta en `mockDb`
- Actualiza stock de productos en `mockDb`
- Resetea carrito y cupón

## Propuestas de ejercicios

- **Ejercicio 1**: añadir una nueva categoría y que el filtro la soporte (store `products` + UI).
- **Ejercicio 2**: persistir también `selectedCategory` en `localStorage`.
- **Ejercicio 3**: crear un composable `useLocalStorageRef(key, defaultValue)` y refactorizar carrito/favoritos.
- **Ejercicio 4**: mejorar `mockDb` para soportar “búsqueda por texto” (nombre/descripción) y usarlo en la tienda.
- **Ejercicio 5**: añadir una pantalla “Ventas totales (rango de fechas)” reutilizando store de ventas.

## IDE recomendado

VSCode/Cursor con extensión de Vue (Volar). Si usas VSCode, desactiva Vetur.
