import type { Meta, StoryObj } from "@storybook/react-vite";
import { HowSection } from "./HowSection";

export default {
  component: HowSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HowSection>;

export const Default: StoryObj = {};
