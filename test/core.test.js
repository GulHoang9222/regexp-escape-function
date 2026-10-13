import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import { escapeRegExp } from '../src/core.js';

describe('escapeRegExp', () => {
  it('returns the input unchanged when it contains no metacharacters', () => {
    assert.equal(escapeRegExp('hello'), 'hello');
  });

  it('returns the empty string unchanged', () => {
    assert.equal(escapeRegExp(''), '');
  });

  it('escapes the backslash', () => {
    assert.equal(escapeRegExp('\\'), '\\\\');
  });

  it('escapes the caret', () => {
    assert.equal(escapeRegExp('^'), '\\^');
  });

  it('escapes the dollar sign', () => {
    assert.equal(escapeRegExp('$'), '\\$');
  });

  it('escapes the asterisk', () => {
    assert.equal(escapeRegExp('*'), '\\*');
  });

  it('escapes the plus sign', () => {
    assert.equal(escapeRegExp('+'), '\\+');
  });

  it('escapes the question mark', () => {
    assert.equal(escapeRegExp('?'), '\\?');
  });

  it('escapes the period', () => {
    assert.equal(escapeRegExp('.'), '\\.');
  });

  it('escapes parentheses', () => {
    assert.equal(escapeRegExp('()'), '\\(\\)');
  });

  it('escapes the pipe', () => {
    assert.equal(escapeRegExp('|'), '\\|');
  });

  it('escapes square brackets', () => {
    assert.equal(escapeRegExp('[]'), '\\[\\]');
  });

  it('escapes curly braces', () => {
    assert.equal(escapeRegExp('{}'), '\\{\\}');
  });

  it('escapes every metacharacter in a mixed string', () => {
    const raw = 'price: $5.00 (each) [sale] {2x} *+?^| \\ done';
    const escaped = escapeRegExp(raw);
    // The escaped string, used as a RegExp source, must match the original.
    const re = new RegExp(escaped);
    assert.equal(re.test(raw), true);
  });

  it('does not alter characters that are not metacharacters', () => {
    const raw = 'abc 123 !@#%&_=~`';
    assert.equal(escapeRegExp(raw), raw);
  });

  it('handles a string composed entirely of metacharacters', () => {
    const raw = '\\^$*+?.()|[]{}';
    const escaped = escapeRegExp(raw);
    const re = new RegExp(escaped);
    assert.equal(re.test(raw), true);
  });

  it('throws a TypeError for non-string input', () => {
    assert.throws(() => escapeRegExp(42), TypeError);
    assert.throws(() => escapeRegExp(null), TypeError);
    assert.throws(() => escapeRegExp(undefined), TypeError);
    assert.throws(() => escapeRegExp({}), TypeError);
  });
});
