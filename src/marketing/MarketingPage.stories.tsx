import type { Meta, StoryObj } from "@storybook/react-vite";
import App from "../App";

export default {
  component: App,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 900,
      },
    },
  },
} satisfies Meta<typeof App>;

export const Default: StoryObj = {};
