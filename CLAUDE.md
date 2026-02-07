# CLAUDE.md

## Project Overview

React 19 + TypeScript e-commerce app built with Vite, TanStack Start (file-based routing), TanStack Query, and Tailwind CSS.

---

## ⛔ Hard Rules (Always Ask First)

- Never install packages without permission
- Never use `any` type without permission
- Never use hardcoded hex colors - use theme colors only

---

## Architecture: Feature-First Pattern

```
/features/[feature]/
  components/
  __tests__/
  types/types.ts
  [feature]Service.ts
  [feature]Queries.ts
  [feature]Mutations.ts
  [feature]QueryFactory.ts
  constants.ts
  utils.ts
```

---

## Naming Conventions

### Files

| Type          | Convention               | Example                   |
| ------------- | ------------------------ | ------------------------- |
| Components    | PascalCase               | `ProductCard.tsx`         |
| Skeletons     | PascalCase + Skeleton    | `ProductCardSkeleton.tsx` |
| Hooks         | camelCase with `use`     | `useCart.ts`              |
| Services      | camelCase + Service      | `productService.ts`       |
| Queries       | camelCase + Queries      | `productQueries.ts`       |
| Mutations     | camelCase + Mutations    | `productMutations.ts`     |
| Query Factory | camelCase + QueryFactory | `productQueryFactory.ts`  |
| Utils         | camelCase                | `formatters.ts`           |
| Types         | camelCase                | `types.ts`                |
| Constants     | camelCase                | `constants.ts`            |
| Tests         | original + `.test`       | `ProductCard.test.tsx`    |

### Folders

| Type       | Convention | Example          |
| ---------- | ---------- | ---------------- |
| Features   | kebab-case | `shopping-cart/` |
| Components | lowercase  | `components/`    |
| Tests      | lowercase  | `__tests__/`     |

---

## Component Guidelines

- Keep components ~200 lines max; break into smaller reusable pieces
- Check for existing components before creating new ones
- `h1-h6`, `p`, `span` are pre-styled - don't add text-size classes
- Use `useToggle` hook (without destructuring) for toggle states
- Avoid `useEffect` unless absolutely necessary
- Static data goes outside React functions
- Static variables: UPPER_CASE, stored in feature-level `constants/`

---

## Type Safety

- Check for existing types/enums before creating new ones
- Use `Pick<Type, "field">` to derive types - avoid `Omit`
- Explicit typing everywhere - no loose params to queries/mutations
- Forms must explicitly pass only required fields to mutations

---

## Data Fetching

### Architecture

- **No direct fetch calls** - use TanStack Query only
- Services: Feature-level `[feature]Service.ts` using createServerFn ⚠️ **MUST be top-level exports, never wrap in objects**. Use descriptive function names (e.g., `getProductById`, `createOrder`)
- Queries: Use query options pattern in `[feature]Queries.ts` with feature level exported object and all queries inside that object.
- Query keys: Define in `[feature]QueryFactory.ts`
- Mutations: Separate `[feature]Mutations.ts` file consisting of hooks

### Route-Level Data Fetching (Preferred)

Use loader + useSuspenseQuery pattern for route-level data:

```typescript
// routes/_protected/products/$productId.tsx
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { productQueries } from '@/features/products/productQueries'

export const Route = createFileRoute('/_protected/products/$productId')({
  loader: async ({ context, params }) => {
    // Prefetch in loader - use context.queryClient, NOT imported queryClient
    await context.queryClient.ensureQueryData(productQueries.detail(params.productId))
  },
  component: ProductDetailComponent,
})

function ProductDetailComponent() {
  const { productId } = Route.useParams()
  // Data is already cached from loader - no loading state needed
  const { data: product } = useSuspenseQuery(productQueries.detail(productId))

  return <div>{product.name}</div>
}
```

### Query Client Access

| Context                              | How to Access                   |
| ------------------------------------ | ------------------------------- |
| Route loader                         | `context.queryClient`           |
| Components (mutations, invalidation) | Import from `queryClient.ts`    |
| Components (reading data)            | `useSuspenseQuery` / `useQuery` |

**Never use `useQueryClient()` hook**

### Component-Level Queries

For data not tied to route (e.g., infinite scroll, polling, user-triggered):

```typescript
const { data } = useSuspenseQuery(productQueries.list(filters));
```

### Mutations

```typescript
import { queryClient } from "@/lib/queryClient";

const createProductMutation = useCreateProductMutation();

* onSuccess, onError, query invalidation are handled inside the mutation hook *

const handleSubmit = (data: DataType) => {
  createProductMutation.mutate(data);
};
```

---

## UI Patterns

### Loading States

| Fetching Level             | Loading UI                     | Who Handles It  |
| -------------------------- | ------------------------------ | --------------- |
| Route-level (loader)       | `pendingComponent` on route    | TanStack Router |
| Component-level (useQuery) | `QueryStateHandler` / Skeleton | React           |

**Route-level loading (preferred for page data):**

```typescript
export const Route = createFileRoute("/_protected/products/$productId")({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      productQueries.detail(params.productId),
    );
  },
  pendingComponent: ProductDetailSkeleton,
  component: ProductDetailComponent,
});
```

**Component-level loading (for non-route data):**

```typescript
// Use QueryStateHandler for component-level queries
<QueryStateHandler query={cartQuery} loadingFallback={<CartSkeleton />}>
  {(data) => <CartItems items={data.items} />}
</QueryStateHandler>
```

### Skeleton Rules

- Always create Skeletons in a separate file: `[Component]Skeleton.tsx`
- Skeletons must match the actual UI layout exactly
- Store in feature's components folder: `/features/[feature]/components/[Component]Skeleton.tsx`
- Route-level: Import and use in `pendingComponent`
- Component-level: Pass to `QueryStateHandler` or use with Suspense

```
/features/products/
  components/
    ProductDetail.tsx
    ProductDetailSkeleton.tsx    # Matching skeleton
    ProductList.tsx
    ProductListSkeleton.tsx      # Matching skeleton
```

### Toasts

- Use `toast` from toast component for mutation success
- Use `showErrorToasts` in mutation `onError`

---

### Currency

- Always use <CurrencyRenderer /> component for displaying any currency/price data
- Never format currency manually or use raw numbers

---

## Forms & Validation

- Always use React Hook Form + Zod
- Use Zod schemas for route search param validation
- Access route values via `getRouteApi("/_layout/path")` - no prop drilling

---

## Routing Patterns (TanStack Start)

### Route Groups

```
/routes/
  _public/              # Public routes - accessible to everyone
    index.tsx           # Home page
    products/
    about/

  _auth/                # Auth routes - login, register (redirect if logged in)
    login.tsx
    register.tsx
    forgot-password.tsx

  _protected/           # Protected routes - requires authentication
    account/
    checkout/
    orders/
```

### Route Group Behavior

| Group        | Logged Out User      | Logged In User      |
| ------------ | -------------------- | ------------------- |
| `_public`    | ✅ Accessible        | ✅ Accessible       |
| `_auth`      | ✅ Accessible        | 🔄 Redirect to home |
| `_protected` | 🔄 Redirect to login | ✅ Accessible       |

### Rules

- Define all route paths in route constants file
- Use `getRouteApi("/_protected/account")` to access route params/search and other route data
- Colocate route-specific components in the route file or feature folder
- Use Zod schemas for search param validation in route files

---

## Utilities

- Enums: Create object mappers (e.g., `getStatusLabel`)
- Use formatters for: dates, phone numbers, currency

---

## Performance

- This is e-commerce - speed is critical
- Evaluate performance impact on every feature build
- Lazy load routes and heavy components
- Optimize images and assets
- Minimize bundle size - check imports

---

## Testing

### Stack

- **Vitest** - Unit tests & component tests
- **React Testing Library (RTL)** - Component integration tests
- **Playwright** - E2E tests

### File Structure

```
/features/[feature]/
  __tests__/
    [component].test.tsx      # RTL component tests
    [feature]Service.test.ts  # Service unit tests
    [hook].test.ts            # Hook tests

/e2e/
  [feature]/
    [flow].spec.ts            # Playwright E2E tests
  pages/
    [Page]Page.ts             # Page Object Models
```

### Naming Conventions

- Unit/Component tests: `*.test.ts` or `*.test.tsx`
- E2E tests: `*.spec.ts`
- Page Objects: `[Page]Page.ts`

### Unit Tests (Vitest)

- Test services, utils, and pure functions
- Test query key factories return correct keys

```typescript
vi.mock("@/lib/api", () => ({
  getData: vi.fn(),
}));

// ❌ Bad - mocking the whole service
vi.mock("./productService");
```

### Component Tests (RTL + Vitest)

- Test user interactions, not implementation details
- Use `screen.getByRole` over `getByTestId` when possible
- Wrap components with test providers (QueryClient, Router)
- Mock at the service level, not query level

```typescript
// Use the shared test wrapper
import { renderWithProviders } from "@/test/utils";

// Test user behavior
await user.click(screen.getByRole("button", { name: /add to cart/i }));
expect(screen.getByText(/added successfully/i)).toBeInTheDocument();
```

### Query/Mutation Testing

- Use `@tanstack/react-query` testing utilities
- Create a fresh `QueryClient` per test
- For loading states: don't resolve the promise immediately
- For error states: reject the mocked service call

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});
```

### E2E Tests (Playwright)

- Test critical user flows only (checkout, auth, search)
- Use Page Object Model pattern
- Never share state between tests
- Use API mocking for edge cases, real API for happy paths

```typescript
// e2e/pages/CartPage.ts
export class CartPage {
  constructor(private page: Page) {}

  async addItem(productId: string) {
    await this.page.getByTestId(`add-${productId}`).click();
  }

  async checkout() {
    await this.page.getByRole("button", { name: /checkout/i }).click();
  }
}
```

### What to Test Where

| Layer          | Tool         | What to Test                           |
| -------------- | ------------ | -------------------------------------- |
| Utils/Services | Vitest       | Pure logic, API calls, transformations |
| Hooks          | Vitest + RTL | State changes, side effects            |
| Components     | RTL          | User interactions, rendering logic     |
| Pages          | RTL          | Integration of components              |
| User Flows     | Playwright   | Checkout, auth, search, critical paths |

### Testing Rules

- No snapshot tests unless explicitly approved
- Always test error states and loading states
- Use `data-testid` sparingly - prefer accessible queries
- Tests must not depend on each other
- Mock timers for debounce/throttle tests

### Critical E2E Flows (Must Have)

- Auth: Sign up, Login, Logout, Password reset
- Shopping: Search, Filter, Add to cart, Update cart, Remove from cart
- Checkout: Address, Payment, Order confirmation
- Account: Order history, Profile update

### Test Commands

```bash
pnpm test           # Run Vitest
pnpm test:ui        # Vitest UI
pnpm test:e2e       # Playwright
pnpm test:coverage  # Coverage report
```

---

## Key File Paths

```
queryClient:      src/lib/queryClient.ts
test utils:       src/test/utils.tsx
test mocks:       src/test/mocks/
```
