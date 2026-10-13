/**
 * Escapes the twelve characters that have special meaning inside a JavaScript
 * regular expression: \ ^ $ * + ? ( ) [ { |
 *
 * The set is taken from ECMA-262 (the ECMAScript specification). Every one of
 * these characters can change how a pattern is interpreted when it appears
 * unescaped, so each is prefixed with a backslash.
 *
 * A single character-class replacement is used instead of repeated string
 * concatenation or a hand-rolled loop: it lets the engine optimise the scan
 * and keeps the code short enough to audit at a glance.
 *
 * @param {string} input - The string to escape.
 * @returns {string} A string safe to embed inside a `RegExp` constructor as a
 *   literal match pattern.
 * @throws {TypeError} If `input` is not a string. Failing loudly here is
 *   deliberate: silently coercing `null` or `undefined` to the string "null"
 *   would produce a pattern that matches the wrong text.
 */
export function escapeRegExp(input) {
  if (typeof input !== 'string') {
    throw new TypeError('escapeRegExp expected a string');
  }
  return input.replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
}
