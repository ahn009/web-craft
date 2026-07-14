import test from 'node:test';
import assert from 'node:assert/strict';
import { buildApiUrl, normalizeApiBaseUrl } from './api.ts';

test('normalizeApiBaseUrl trims whitespace and trailing slashes', () => {
  assert.equal(normalizeApiBaseUrl(' http://localhost:3000/// '), 'http://localhost:3000');
});

test('normalizeApiBaseUrl returns an empty string for same-origin mode', () => {
  assert.equal(normalizeApiBaseUrl(undefined), '');
  assert.equal(normalizeApiBaseUrl(''), '');
});

test('buildApiUrl supports same-origin and absolute API URLs', () => {
  assert.equal(buildApiUrl('', '/api/agents'), '/api/agents');
  assert.equal(buildApiUrl('https://example.com', 'api/agents'), 'https://example.com/api/agents');
});
