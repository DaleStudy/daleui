import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack } from "./VStack";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";
import { HStack } from "../HStack/HStack";

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
    align: {
      description: "주축 정렬 방식 (세로 정렬)",
    },
    reversed: { description: "세로 배치 방향" },
    gap: { control: "select", options: Object.keys(spacing || {}) },
    className: { control: false },
  },
  args: {
    as: "div",
    reversed: false,
    align: "top",
    gap: "8",
    children: (
      <>
        <Item>아이템 1</Item>
        <Item>아이템 2</Item>
      </>
    ),
    className: css({ height: "160" }),
  },
} satisfies Meta<typeof VStack>;

type Story = StoryObj<typeof VStack>;
export const Default: Story = {};

export const Gaps: Story = {
  render: (args) => (
    <HStack gap="24" align="center">
      <div>
        <h4>간격 2</h4>
        <VStack {...args} gap="4" />
      </div>
      <div>
        <h4>간격 8</h4>
        <VStack {...args} gap="8" />
      </div>
      <div>
        <h4>간격 16</h4>
        <VStack {...args} gap="16" />
      </div>
    </HStack>
  ),
  argTypes: {
    gap: { control: false },
  },
};

export const Reverse: Story = {
  render: (args) => (
    <HStack gap="24" align="center">
      <div>
        <h4>false</h4>
        <VStack {...args} reversed={false} />
      </div>
      <div>
        <h4>true</h4>
        <VStack {...args} reversed={true} />
      </div>
    </HStack>
  ),
  argTypes: {
    reversed: { control: false },
  },
};

export const Align: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "16" })}>
      <div>
        <h4>top - 위쪽 정렬</h4>
        <VStack {...args} align="top" />
      </div>

      <div>
        <h4>bottom - 아래쪽 정렬</h4>
        <VStack {...args} align="bottom" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <VStack {...args} align="center" />
      </div>

      <div>
        <h4>between - 양 끝 정렬</h4>
        <VStack {...args} align="between" />
      </div>
      <div>
        <h4>around - 균등 분산</h4>
        <VStack {...args} align="around" />
      </div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
};
