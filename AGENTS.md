# vue-shop contributor guide

## Purpose and stack

This is a learning-oriented Vue 3 single-page streetwear shop. It uses Vite, JavaScript, the Composition API with `<script setup>`, Pinia setup stores, Vue Router, FormKit, and Tailwind CSS. Use the `@/` alias for imports from `src/`.

## Working safely

- Start new work from `origin/dev` on a dedicated branch; keep `dev` available as the clean learning baseline.
- Do not overwrite or stage unrelated working-tree changes. In particular, `yarn.lock` may contain an unrelated user change. Do not change it unless the task explicitly requires a dependency or lockfile update.
- Keep changes focused on the requested exercise or feature. Preserve the learning-oriented comments, simple architecture, and demo flow.

## Project layout

- `src/views/`: route-level composition and page state. Shop pages live in `views/shop/`; backoffice pages in `views/backoffice/`.
- `src/components/layout/`: shared structure and visual feedback. `src/components/ui/shop/` and `src/components/ui/backoffice/`: domain UI components.
- `src/stores/`: cross-page business state and actions. Keep stores in Pinia's setup-store style.
- `src/composables/`: reusable, non-visual Composition API logic.
- `src/data/mockDb.js`: in-memory reactive DAO backed by `localStorage`; stores should be the application-facing boundary for it.
- `src/router/index.js`: named routes and lazy-loaded view modules.
- `formkit.config.js`: global FormKit styling; use Tailwind utilities for component-specific styling.

## Implementation conventions

- Prefer a view → store → `mockDb` flow. Do not mutate `mockDb.products` or `mockDb.sales` from views/components.
- Product and sales data persist in `localStorage` under `vue-shop-mock`; cart and favourites use `cartItems` and `favourites`. Keep stored data compatible when changing object shapes.
- Reuse the existing `useToast`, `Dialog`, `Spinner`, FormKit, and `@heroicons/vue` patterns before adding alternatives.
- Use route names with `router.push({ name: '...' })` for in-app navigation.
- Keep UI copy and code style consistent with the surrounding file. This repository currently mixes English UI copy with Spanish documentation.

## Validation

- No automated test or lint script is configured.
- For app changes, run `npm run build` as the baseline validation. Do not run dependency installation solely for validation.
- For persistence or checkout changes, manually check both a fresh browser storage state and a pre-existing state. The backoffice **Import demo content** screen is the supported way to seed products.
