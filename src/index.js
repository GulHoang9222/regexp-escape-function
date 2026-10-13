/**
 * Public entry point for regexp-escape-function.
 *
 * Re-exports the single escape function so consumers can import from the
 * package root without reaching into internal modules.
 */
export { escapeRegExp } from './core.js';
