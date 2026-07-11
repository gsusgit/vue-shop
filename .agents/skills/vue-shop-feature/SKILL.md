---
name: vue-shop-feature
description: Implement or review a Vue Shop user-facing or backoffice feature, exercise, route, view, component, form, cart, or navigation change while following this repository's Vue, Pinia, FormKit, and Tailwind conventions.
---

# Vue Shop feature workflow

Use this skill for changes to the shop, backoffice, routing, components, forms, navigation, cart, vouchers, favourites, or sales UI.

## Before changing code

1. Read `AGENTS.md` and the relevant route, view, store, and nearby components.
2. Check the current Git branch and working tree. Do not touch unrelated changes, especially `yarn.lock`.
3. Trace the existing data flow before adding state. Prefer an existing Pinia store or composable over new duplicated state.

## Implementing a feature

- Use `<script setup>` and `@/` imports.
- Keep route-level composition in `src/views/`; keep reusable UI in the appropriate `src/components/` subtree.
- Add routes in `src/router/index.js`. Use named navigation via `router.push({ name: '...' })`.
- Put shared business state/actions in a setup-style Pinia store under `src/stores/`; keep reusable non-visual logic in `src/composables/`.
- Use FormKit for forms and validation. Extend `formkit.config.js` only for globally shared style conventions.
- Reuse `useToast`, `Dialog`, `Spinner`, and Heroicons if they fit. Avoid adding a dependency for a capability already present in the app.
- Style with existing Tailwind utility patterns and retain responsive behavior.

## Data and persistence

Call store actions from views/components. Stores may use the DAO functions in `src/data/mockDb.js`; views and components must not mutate the exported DAO refs directly. Preserve compatibility with data already stored in the browser.

## Validate

Run `npm run build`. For a user flow, manually exercise the changed route and its main success/empty/error states. For a feature that uses persisted state, re-check after a page refresh and with fresh `localStorage`.
