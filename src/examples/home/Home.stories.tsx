import type { Meta, StoryObj } from "@storybook/react";
import { Home } from "./Home";

export default {
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Home>;

export const Desktop: StoryObj<typeof Home> = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
  },
};

export const Mobile: StoryObj<typeof Home> = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
