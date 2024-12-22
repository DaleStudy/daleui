import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent } from "@storybook/test";
import { Button } from "./Button";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "button",
    children: "Click",
  },
  play: async ({ args: { onClick }, canvas, step }) => {
    const button = canvas.getByRole("button");

    await step("renders a button with text", async () => {
      expect(button).toHaveTextContent("Click");
    });

    await step("calls onClick handler when clicked", async () => {
      await userEvent.click(button);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const Submit: Story = {
  args: {
    type: "submit",
    children: "Submit",
  },
};
