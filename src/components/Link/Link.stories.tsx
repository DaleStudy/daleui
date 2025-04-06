import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

export default {
  component: Link,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "링크",
  },
} satisfies Meta<typeof Link>;

export const Basic: StoryObj<typeof Link> = {};
