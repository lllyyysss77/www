# Partner API verification

A use-case page ships **runnable** code. Never invent endpoints, auth headers, request fields,
response shapes, or status values — readers will copy them. Verify against the partner's real
docs before writing the snippets, and adjust the snippets to match exactly.

## What you must confirm

For each partner call shown on the page:

1. **Base URL + endpoint path** (and method).
2. **Auth** — exact header name and format (`Bearer`? `x-...-api-key`? query param?).
3. **Request body** — exact field names and accepted types. In particular, can the input be
   passed **by URL**? (Prefer URL input — it pairs cleanly with Microlink's hosted output and is
   usually the max-quality path.)
4. **Sync vs async** — does it return a result directly, or a task you must poll / receive via
   webhook?
5. **Response shape** — for async: the **task id field**, the **status field** and **all its
   values**, and the **exact path to the output URL**.
6. **Constraints worth a sentence** — quality/mode flags, rate limits, polling interval.

If the docs are JS-heavy or a claim can't be verified from fetchable content, treat it as
unverified and ask the user instead of guessing.

## How to verify (the method that worked for Magnific)

Use `WebFetch` (and `WebSearch` to find pages). Good entry points, in order:

1. `https://docs.<partner>.com/llms.txt` — the docs index; lists every reference page + the
   auth page. Start here to discover exact URLs instead of guessing them.
2. The **authentication** page — confirm the header name/format verbatim.
3. The **specific endpoint** page — confirm method, path, and every request field.
4. A **task / get-by-id** page (for async APIs) — confirm the task id field, status values, and
   the output URL path. If the exact endpoint page 404s, fetch a **sibling endpoint of the same
   provider** — task response shapes are usually consistent across a provider's services.

Cross-check anything ambiguous against a second page. Don't trust a single fuzzy extraction for
field names.

## Worked example — Magnific (verified, used in `upscale-extracted-images.js`)

| Detail | Value |
|---|---|
| Base URL | `https://api.magnific.com` |
| Auth header | `x-magnific-api-key: <key>` (NOT `Bearer`) |
| Endpoint (Precision, faithful) | `POST /v1/ai/image-upscaler-precision-v2` |
| Image input | `image` — HTTPS URL or base64 (URL = max quality) |
| Scale | `scale_factor` (2–16); faithful photographic mode via `flavor: 'photo'` |
| Create response | `{ data: { task_id, status: 'IN_PROGRESS', generated: [] } }` |
| Poll | `GET /v1/ai/image-upscaler-precision-v2/{task_id}` |
| Status values | `CREATED` / `IN_PROGRESS` / `COMPLETED` / `FAILED` |
| Output URL | `data.generated[0]` |

The reference page's two snippets reflect exactly this: Microlink returns the image URL +
dimensions; the partner call passes the **hosted URL**, then **creates a task and polls** until
`COMPLETED`, reading `data.generated[0]`.

This table is the *result* of verification, not a template — every partner differs. Re-run the
method above for each new partner and rewrite the snippets to its real schema.

## Snippet conventions

- Two blocks max: (1) the Microlink call that produces the input, (2) the partner call that
  consumes it. Keep them short and copy-pasteable; no noisy comments.
- Read secrets from `process.env.<PARTNER>_API_KEY`.
- For async partners, show the create → poll loop with the **real** status values and output
  field. Mention webhooks in prose if the partner supports them (don't add a second code path
  unless asked).
- Validate before shipping: write each snippet to a temp `.mjs` and run `node --check`.
- The `CodeEditor` reformats snippets at runtime (no semicolons, single quotes) and only runs
  `template()` substitution if the code literally contains `demolinks.` — so plain valid JS is
  safe. Do not run a formatter on the page file.
