This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Testing

### Local

Run all tests:
```bash
npx playwright test
```

UI mode (watch steps run through):
```bash
npx playwright test --ui
```

Debug mode:
```bash
npx playwright test --debug
```

Run with a visible browser:
```bash
npx playwright test --headed
```

Run the E2E smoke test only:
```bash
npx playwright test e2e/smoke.spec.ts
```

Run the API tests only:
```bash
npx playwright test e2e/api.spec.ts
```

### Against a Vercel preview or production deployment

Load the Vercel bypass secret from `.env.local` and run against a deployed URL:
```bash
set -a
source .env.local
set +a
BASE_URL=https://your-preview-url.vercel.app npx playwright test
```


### Unit tests

Run the unit tests:
```bash
npm run test:unit
```

These cover the rate-limiting logic in `src/lib/rate-limiter.ts` using the built-in Node test runner via `tsx`.
