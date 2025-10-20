import type { Meta, StoryObj } from "@storybook/react-vite";
import App from "../App";

export default {
  component: App,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof App>;

export const Default: StoryObj = {};
