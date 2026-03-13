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

1. **Entrada de la app** → `src/main.js`
2. **Layout global** → `src/App.vue`
3. **Rutas** → `src/router/index.js`
4. **Estado y “backend”** → `src/stores/*` + `src/data/mockDb.js`
5. **Vistas** → `src/views/**`
6. **Componentes UI** → `src/components/**`
7. **Composables** → `src/composables/**`

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
- Expone funciones de acceso a datos (DAO = *Data Access Object*: patrón que encapsula el acceso a la “base de datos”): `addProduct`, `updateProduct`, `getSalesByDate`, etc.

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

- **Ejercicio 1 (Nivel: Fácil)**: añadir una nueva categoría y que el filtro la soporte (store `products` + UI).  
  Comentario: ideal para practicar filtros reactivos, estado global sencillo y cómo conectar un filtro de UI con una store.

- **Ejercicio 2 (Nivel: Fácil)**: persistir también `selectedCategory` en `localStorage`.  
  Comentario: refuerza el patrón de persistencia en `localStorage` y cómo rehidratar estado al arrancar la app.

- **Ejercicio 3 (Nivel: Medio)**: crear un composable `useLocalStorageRef(key, defaultValue)` y refactorizar carrito/favoritos.  
  Comentario: te obliga a encapsular lógica repetida en un composable reutilizable (DRY) y pensar en APIs limpias.

- **Ejercicio 4 (Nivel: Medio)**: mejorar `mockDb` para soportar “búsqueda por texto” (nombre/descripción) y usarlo en la tienda.  
  Comentario: combina filtrado de datos, pequeño “DAO” en memoria y componentes controlados por inputs de búsqueda.

- **Ejercicio 5 (Nivel: Medio)**: añadir una pantalla “Ventas totales (rango de fechas)” reutilizando store de ventas.  
  Comentario: buen ejercicio de reutilización de stores, computeds y diseño de una vista más “de reporting”.

- **Ejercicio 6 (Nivel: Medio)**: cuando se añada un producto al carrito, mostrar un modal con el resumen del carrito y dos acciones: “Proceder al pago” (navega a la vista de carrito/checkout) y “Seguir comprando” (cierra el modal).  
  Comentario: trabajas con comunicación entre componentes, uso de modales reutilizables y navegación programática con Vue Router.

- **Ejercicio 7 (Nivel: Medio/Alto)**: ampliar el flujo de pago creando una vista de “pasarela de pago” a pantalla completa con nombre de banco inventado y formulario de tarjeta de crédito (validar 16 dígitos, fecha de expiración mm/yy posterior a la actual y CVV de 3 dígitos).  
  Comentario: mezcla rutas nuevas, formularios y validación más avanzada (regex/validadores custom) sobre FormKit.

- **Ejercicio 8 (Nivel: Medio/Alto)**: añadir un perfil de cliente accesible desde un icono de usuario en el menú superior que muestre pedidos del cliente y, si quieres, otros datos de perfil. De paso, adapta el menú para quitar o reubicar la opción de favoritos actual.  
  Comentario: buen escenario para practicar rutas adicionales de la parte pública, vistas de perfil y diseño de navegación.

- **Ejercicio 9 (Nivel: Alto)**: implementar sistema de traducción de la app (i18n) para soportar inglés y español y añadir al menú de navegación.  
  Comentario: implica reorganizar textos, pensar en claves de traducción y comprender cómo integrar un plugin global.

- **Ejercicio 10 (Nivel: Alto)**: implementar sistema de autenticación y autorización para el backoffice y añadir al menú de navegación.  
  Comentario: toca conceptos de roles, protección de rutas y manejo de sesión (aunque sea simulado en el front).
