import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mission } from "./Mission";

export default {
  component: Mission,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Mission>;

export const Default: StoryObj<typeof Mission> = {};
