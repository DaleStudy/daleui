import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./Footer";

export default {
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export const Default: StoryObj<typeof Footer> = {};
