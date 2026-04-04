import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://localhost:3000';
const bypassSecret = process.env.VERCEL_BYPASS_SECRET;

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  use: {
    baseURL,
    headless: true,
    extraHTTPHeaders: bypassSecret ? {
      'x-vercel-protection-bypass': bypassSecret,
      'x-vercel-set-bypass-cookie': 'true',
    } : undefined,
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
