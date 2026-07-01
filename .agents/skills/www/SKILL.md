```markdown
# www Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns and workflows used in the `www` JavaScript codebase. You'll learn about the project's coding conventions, how to update internal website navigation, and how to follow the repository's commit and testing practices. This guide is especially useful for contributors aiming to maintain consistency and efficiency in the absence of a formal framework.

## Coding Conventions

### File Naming
- **Style:** camelCase
- **Example:**  
  ```
  src/pages/tools/websiteScreenshot/index.js
  ```

### Imports
- **Style:** Absolute imports are preferred.
- **Example:**
  ```js
  import utils from 'src/utils/helpers';
  ```

### Exports
- **Style:** Mixed (both default and named exports are used).
- **Examples:**
  ```js
  // Default export
  export default function ScreenshotTool() { ... }

  // Named export
  export function getScreenshotUrl() { ... }
  ```

### Commit Messages
- **Style:** Conventional commits with `chore` prefix.
- **Example:**  
  ```
  chore: update internal links for screenshot tool
  ```

## Workflows

### Update Internal Links to Screenshot Tool
**Trigger:** When you need to improve, add, or reorder internal navigation to the website screenshot tool.
**Command:** `/update-screenshot-links`

1. **Edit relevant files** under `src/pages/tools/website-screenshot/` (such as `bulk.js`, `animated.js`, `full-page.js`, `index.js`, `mobile.js`) to add or update internal links.
   ```js
   // Example: Adding a new link in index.js
   import Link from 'src/components/Link';

   // Inside your component's render:
   <Link href="/tools/website-screenshot/full-page">Full Page Screenshot</Link>
   ```
2. **Optionally update** `src/pages/screenshot.js` if the main screenshot landing page is affected.
3. **Update** `data/git-timestamps-modified.json` to reflect changes in the modified files.
   ```json
   {
     "src/pages/tools/website-screenshot/full-page.js": "2024-06-12T14:23:00Z"
   }
   ```
4. **Commit your changes** using the conventional commit style:
   ```
   chore: update links for screenshot tool navigation
   ```

## Testing Patterns

- **Framework:** Unknown (not detected in analysis).
- **Test File Pattern:** Files follow the `*.test.*` naming convention.
  - **Example:**  
    ```
    src/pages/tools/website-screenshot/index.test.js
    ```
- **Typical Test Example:**
  ```js
  // index.test.js
  test('renders screenshot tool links', () => {
    // ...test implementation
  });
  ```

## Commands

| Command                  | Purpose                                                        |
|--------------------------|----------------------------------------------------------------|
| /update-screenshot-links | Update or reorder internal links to the website screenshot tool |

```