import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationSection } from "./NavigationSection";

export default {
  component: NavigationSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof NavigationSection>;

export const Default: StoryObj = {};
