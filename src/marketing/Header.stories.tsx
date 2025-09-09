import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./HeaderSection";

export default {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export const Default: StoryObj = {};
