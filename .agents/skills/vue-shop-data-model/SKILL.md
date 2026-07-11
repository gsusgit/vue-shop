---
name: vue-shop-data-model
description: Safely extend or refactor Vue Shop's mockDb DAO, product/sale data shapes, demo seed data, or localStorage persistence while preserving reactive store behavior and existing browser data.
---

# Vue Shop data model and persistence workflow

Use this skill for changes to `src/data/mockDb.js`, `src/data/products.js`, `src/data/demoImages.js`, product or sale shapes, seed behavior, or persisted localStorage state.

## Understand the boundary first

- `src/data/mockDb.js` owns reactive `products` and `sales`, persists them under `vue-shop-mock`, and exposes DAO operations.
- Pinia stores in `src/stores/` are the application-facing layer. Views/components should call stores rather than mutate DAO refs.
- Cart items and favourites are persisted separately under `cartItems` and `favourites`; checkout relies on product IDs, names, prices, quantities, images, stock, and sales date/invoice fields.
- Demo import replaces the complete product list. Its source data is in `src/data/products.js`, and image lookup is in `src/data/demoImages.js`.

## Make compatible changes

1. Find every producer and consumer of a field before renaming, removing, or changing its type.
2. Preserve IDs and the fields checkout/reporting uses. Keep numeric fields numeric after FormKit input handling.
3. When adding an optional field, provide a sensible default for both newly seeded and previously stored records.
4. Make deserialization defensive: malformed or missing localStorage content must not prevent the app loading.
5. Add or extend DAO functions for new queries or mutations. Keep persistence encapsulated in `mockDb.js` rather than scattering `localStorage` calls.
6. If a deliberately incompatible local-storage change is unavoidable, document a migration/reset step in the relevant documentation and communicate it in the final summary.

## Verify behavior

- Check a clean storage state and an existing state in browser DevTools.
- Run the backoffice **Import demo content** flow after seed-data changes.
- Exercise product creation/editing, cart checkout, and sales reporting if their data fields changed.
- Run `npm run build` before finishing.
