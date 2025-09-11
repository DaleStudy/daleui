import type { Meta, StoryObj } from "@storybook/react-vite";
import { Community } from "./Community";

export default {
  component: Community,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Community>;

export const Default: StoryObj<typeof Community> = {};
