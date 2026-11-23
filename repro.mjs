// Prints the imports of `storybook tools docs show --id ui-button` for each
// combination of the two experimental flags.
import { execFileSync } from "node:child_process";
import { rmSync } from "node:fs";

const combinations = [
  ["0", "0"],
  ["1", "0"],
  ["0", "1"],
  ["1", "1"],
];

for (const [componentMeta, docgenServer] of combinations) {
  rmSync("node_modules/.cache/storybook", { recursive: true, force: true });
  const output = execFileSync(
    "node_modules/.bin/storybook",
    ["tools", "docs", "show", "--id", "ui-button", "--no-attach"],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        COMPONENT_META: componentMeta,
        DOCGEN_SERVER: docgenServer,
        STORYBOOK_DISABLE_TELEMETRY: "1",
      },
    },
  );
  const imports = [...new Set(output.split("\n").filter((line) => line.startsWith("import ")))];
  console.log(
    `experimentalReactComponentMeta=${componentMeta === "1"} experimentalDocgenServer=${docgenServer === "1"}`,
  );
  for (const line of imports) console.log(`  ${line}`);
}
