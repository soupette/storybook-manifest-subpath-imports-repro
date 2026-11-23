import type { ReactNode } from "react";

/**
 * Shares tooltip timing with its descendants.
 *
 * @import import { TooltipProvider } from "@acme/ui/tooltip";
 */
export function TooltipProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
