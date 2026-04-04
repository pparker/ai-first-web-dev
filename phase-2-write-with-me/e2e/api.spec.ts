import { test, expect } from '@playwright/test';

const testStory = (id: string) => ({
  id,
  title: `Playwright API Test ${id.slice(0, 8)}`,
  child: 'ellie',
  idea: 'playwright-api-test',
  tone: 'funny',
  length: 'short',
  text: 'This is a test story created by Playwright.',
});

test('POST /api/stories is idempotent', async ({ request }) => {
  const id = crypto.randomUUID();

  const first = await request.post('/api/stories', { data: testStory(id) });
  expect(first.status()).toBe(204);

  const second = await request.post('/api/stories', { data: testStory(id) });
  expect(second.status()).toBe(204);

  // cleanup
  await request.delete(`/api/stories/${id}`);
});

test('DELETE /api/stories/[id] removes the story', async ({ request }) => {
  const id = crypto.randomUUID();

  await request.post('/api/stories', { data: testStory(id) });

  const del = await request.delete(`/api/stories/${id}`);
  expect(del.status()).toBe(204);

  const list = await request.get('/api/stories');
  const stories = await list.json();
  expect(stories.some((s: { id: string }) => s.id === id)).toBe(false);
});
