import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button"> & {
  /** Visual style of the button. */
  variant?: "primary" | "secondary";
};

/**
 * Triggers an action.
 *
 * @import import { Button } from "@acme/ui/button";
 */
export function Button({ variant = "primary", ...props }: ButtonProps) {
  return <button data-variant={variant} {...props} />;
}
