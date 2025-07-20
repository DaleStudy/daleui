import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["brand", "neutral", "success", "warning", "danger", "info"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    placeholder: "패스워드를 입력해주세요.",
  },
};


export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PasswordInput size="sm" placeholder="Small size" />
      <PasswordInput size="md" placeholder="Medium size" />
      <PasswordInput size="lg" placeholder="Large size" />
    </div>
  ),
};


export const Tones: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <PasswordInput tone="neutral" placeholder="Neutral tone" />
      <PasswordInput tone="brand" placeholder="Brand tone" />
      <PasswordInput tone="success" placeholder="Success tone" />
      <PasswordInput tone="warning" placeholder="Warning tone" />
      <PasswordInput tone="danger" placeholder="Danger tone" />
      <PasswordInput tone="info" placeholder="Info tone" />
    </div>
  ),
};


export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "password123",
  },
}; 