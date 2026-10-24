# regexp-escape-function

Escapes the twelve regex metacharacters in an arbitrary string so it can be used safely as a literal match pattern inside a `RegExp`.

```js
import { escapeRegExp } from 'regexp-escape-function';

const user = 'price: $5.00 (each)';
const re = new RegExp(escapeRegExp(user));
re.test(user); // true
```

## Why this exists

When you build a `RegExp` from user input or data, any unescaped metacharacter in that input is interpreted as regex syntax rather than as a literal character. A `.` matches any character, a `*` becomes a quantifier, and so on. This library prefixes each of the twelve special characters — `\ ^ $ * + ? ( ) [ { |` — with a backslash so the resulting string is safe to embed directly in a pattern.

The trade-off is simplicity over completeness. This function escapes characters that are special in the *top-level* pattern grammar. It does not try to be context-aware: if you paste the result inside an existing character class (e.g. `[` + escaped + `]`), the behaviour is still correct because the class metacharacters are a subset of the twelve, but the function does not optimise the output for that context.

## Edge case

The function throws a `TypeError` for non-string input rather than coercing it. This is deliberate: silently turning `null` into the string `"null"` would produce a pattern that matches the wrong text, and that kind of bug is hard to trace back to its source.

## Performance

The window keeps a bounded buffer, so `push` is constant time and memory does not
grow with the length of the stream. `peak` and `trough` are linear in the window
size, which is the trade that keeps `push` cheap.

