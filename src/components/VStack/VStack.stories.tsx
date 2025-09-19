import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack } from "./VStack";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={css({
        padding: "16",
        backgroundColor: "bgSolid.brand",
        color: "fgSolid.brand",
        borderRadius: "md",
      })}
    >
      {children}
    </div>
  );
};

export default {
  title: "Components/VStack",
  component: VStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: false },
    as: { control: "select" },
    align: {
      control: "select",
      description: "교차축 정렬 방식 (가로 정렬)",
    },
    reversed: { control: "boolean", description: "세로 배치 방향" },
    gap: { control: "select", options: Object.keys(spacing || {}) },
  },
  args: {
    as: "div",
    reversed: false,
    align: "center",
    gap: "8",
    children: (
      <>
        <Item>아이템 1</Item>
        <Item>아이템 2</Item>
      </>
    ),
    className: css({ width: "160" }),
  },
} satisfies Meta<typeof VStack>;

type Story = StoryObj<typeof VStack>;
export const Default: Story = {};

export const Gaps: Story = {
  render: (args) => (
    <VStack gap="8" align="center">
      <h4>간격 2</h4>
      <VStack {...args} gap="4" />
      <h4>간격 8</h4>
      <VStack {...args} gap="8" />
      <h4>간격 16</h4>
      <VStack {...args} gap="16" />
    </VStack>
  ),
  argTypes: {
    children: { control: false },
    gap: { control: false },
  },
};

export const Reverse: Story = {
  render: (args) => (
    <VStack gap="8" align="center">
      <h4>false</h4>
      <VStack {...args} reversed={false} />
      <h4>true</h4>
      <VStack {...args} reversed={true} />
    </VStack>
  ),
  argTypes: {
    reversed: { control: false },
  },
};

export const Align: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(4, 1fr)", gap: "16" })}>
      <div>
        <h4>left - 왼쪽 정렬</h4>
        <VStack {...args} align="left" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <VStack {...args} align="center" />
      </div>

      <div>
        <h4>right - 오른쪽 정렬</h4>
        <VStack {...args} align="right" />
      </div>

      <div>
        <h4>stretch - 균등 분할</h4>
        <VStack {...args} align="stretch" />
      </div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
  args: {
    gap: "4",
    className: css({ width: "160" }),
  },
};
