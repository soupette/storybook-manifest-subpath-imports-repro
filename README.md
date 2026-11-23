# Storybook manifest: imports for a package with subpath exports

Reproduction for two problems in the imports that `storybook tools docs show`
prints, with Storybook 10.6.1 and `@storybook/react-vite`.

The package `@acme/ui` has no root export, only subpaths:

```json
"exports": {
  "./badge": "./src/badge/badge.tsx",
  "./button": "./src/button/button.tsx",
  "./tooltip": "./src/tooltip/tooltip.tsx"
}
```

`Button` and `TooltipProvider` carry an `@import` JSDoc tag; `Badge` does not.
The story file `src/button/button.stories.tsx` uses all three.

## Run

```bash
npm install
npm run repro
```

`npm run repro` runs `storybook tools docs show --id ui-button --no-attach`
for each combination of `experimentalReactComponentMeta` and
`experimentalDocgenServer`, clears `node_modules/.cache/storybook` before each
run, and prints the imports.

## Result

```text
experimentalReactComponentMeta=false experimentalDocgenServer=false
  import { Badge } from '@acme/ui';
  import { Button } from '@acme/ui/button';
  import { TooltipProvider } from '@acme/ui/tooltip';
experimentalReactComponentMeta=true experimentalDocgenServer=false
  import { Badge, TooltipProvider } from '@acme/ui';
  import { Button } from '@acme/ui/button';
experimentalReactComponentMeta=false experimentalDocgenServer=true
  import { Badge, Button, TooltipProvider } from '@acme/ui';
experimentalReactComponentMeta=true experimentalDocgenServer=true
  import { Badge, Button, TooltipProvider } from '@acme/ui';
```

## Expected

In every combination:

```ts
import { Badge } from "@acme/ui/badge";
import { Button } from "@acme/ui/button";
import { TooltipProvider } from "@acme/ui/tooltip";
```

1. `Badge` has no `@import` tag, so the manifest falls back to the package
   name. `@acme/ui` has no `"."` export, so that import does not resolve. The
   `exports` map gives the right subpath.
2. With `experimentalReactComponentMeta`, `@import` only applies to the meta
   `component` (`Button`), not to other components in the story file
   (`TooltipProvider`).
3. With `experimentalDocgenServer`, `@import` is ignored for every component.
