import { test, expect } from '@playwright/test';

test('generate, view, save, and delete a story', async ({ page }) => {
  // Choose a storyteller
  await page.goto('/select');
  await page.getByRole('button', { name: 'Ellie' }).click();

  // Fill in the story form and generate
  await page.getByRole('textbox').fill('a cat who discovers a hidden door');
  await page.getByRole('button', { name: 'Generate Story' }).click();

  // Wait for generation and navigation (generous timeout for API call)
  await page.waitForURL(/\/story/, { timeout: 60_000 });
  await expect(page.locator('.story-body')).toBeVisible();

  // Capture the generated story title
  const title = (await page.locator('.story-title').textContent())?.trim();

  // Verify the story page survives a reload (confirms DB-backed route works)
  await page.reload();
  await expect(page.locator('.story-body')).toBeVisible();

  // Navigate to Saved Stories
  await page.getByRole('link', { name: 'Saved Stories' }).click();
  await page.waitForURL('/stories');

  // Locate the specific story item by title and verify it is listed
  const storyItem = page.locator('.story-item').filter({ hasText: title });
  await expect(storyItem).toBeVisible();

  // Delete that specific story
  await storyItem.getByRole('button', { name: 'Delete' }).click();

  // Verify that specific story is no longer visible
  await expect(storyItem).not.toBeVisible();
});
