import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

export default {
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "시작하기",
  },
} satisfies Meta<typeof Button>;

export const Basic: StoryObj<typeof Button> = {};
