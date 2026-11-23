import type { StorybookConfig } from "@storybook/react-vite";

// Both flags are on by default; `npm run repro` toggles them with these variables.
const flag = (name: string) => process.env[name] !== "0";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  stories: ["../src/**/*.stories.tsx"],
  features: {
    experimentalReactComponentMeta: flag("COMPONENT_META"),
    experimentalDocgenServer: flag("DOCGEN_SERVER"),
  },
};

export default config;
