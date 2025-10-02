import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navigation } from "./Navigation.tsx";

export default {
  component: Navigation,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navigation>;

export const Default: StoryObj = {};
