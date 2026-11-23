import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../badge/badge";
import { TooltipProvider } from "../tooltip/tooltip";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Button>Save</Button>,
};

export const InTooltipProvider: Story = {
  render: () => (
    <TooltipProvider>
      <Button variant="secondary">Cancel</Button>
    </TooltipProvider>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Button>
      Inbox <Badge>3</Badge>
    </Button>
  ),
};
