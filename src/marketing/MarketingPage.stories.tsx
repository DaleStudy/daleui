import type { Meta, StoryObj } from "@storybook/react-vite";
import { MarketingPage } from "./index";

export default {
  component: MarketingPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MarketingPage>;

export const Default: StoryObj = {};
