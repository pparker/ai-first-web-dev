import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isRateLimited } from './rate-limiter.js';

const LIMIT = 5;
const WINDOW_MS = 60_000;
const BASE_TIME = 1_000_000;

test('first 5 calls from the same IP are allowed', () => {
  const log = new Map<string, number[]>();
  for (let i = 0; i < LIMIT; i++) {
    assert.equal(isRateLimited('1.2.3.4', log, BASE_TIME + i), false);
  }
});

test('6th call within the window is blocked', () => {
  const log = new Map<string, number[]>();
  for (let i = 0; i < LIMIT; i++) {
    isRateLimited('1.2.3.4', log, BASE_TIME + i);
  }
  assert.equal(isRateLimited('1.2.3.4', log, BASE_TIME + LIMIT), true);
});

test('6th call after the window has expired is allowed', () => {
  const log = new Map<string, number[]>();
  for (let i = 0; i < LIMIT; i++) {
    isRateLimited('1.2.3.4', log, BASE_TIME + i);
  }
  // advance time past the window so all prior timestamps expire
  const afterWindow = BASE_TIME + WINDOW_MS + 1;
  assert.equal(isRateLimited('1.2.3.4', log, afterWindow), false);
});

test('different IPs do not share state', () => {
  const log = new Map<string, number[]>();
  for (let i = 0; i < LIMIT; i++) {
    isRateLimited('1.2.3.4', log, BASE_TIME + i);
  }
  // IP A is now at the limit — IP B should still be allowed
  assert.equal(isRateLimited('9.9.9.9', log, BASE_TIME + LIMIT), false);
});
