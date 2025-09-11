import type { Meta, StoryObj } from "@storybook/react-vite";
import { Contribution } from "./Contribution";

export default {
  component: Contribution,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Contribution>;

export const Default: StoryObj<typeof Contribution> = {};
