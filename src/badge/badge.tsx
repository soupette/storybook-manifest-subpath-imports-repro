import type { ReactNode } from "react";

/** Labels a status. No `@import` tag: the manifest has to find the import itself. */
export function Badge({ children }: { children: ReactNode }) {
  return <span>{children}</span>;
}
