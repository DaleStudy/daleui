import type { Meta, StoryObj } from "@storybook/react-vite";
import { How } from "./How";

export default {
  component: How,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof How>;

export const Default: StoryObj = {};
