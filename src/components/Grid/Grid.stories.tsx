import type { Meta, StoryObj } from "@storybook/react";
import { grid } from "../../../styled-system/patterns";
import { Grid } from "./Grid";
import { css } from "../../../styled-system/css";
import { spacing } from "../../tokens/spacing";

const Item = ({ children }: { children: React.ReactNode }) => {};

export default {
  component: Grid,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {};
