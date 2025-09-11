import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack } from "./VStack";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { Button } from "../Button/Button";

export default {
  title: "Components/VStack",
  component: VStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: { control: "select" },
    role: { control: "text" },
    alignItems: {
      control: "select",
      description: "교차축 정렬 방식 (가로 정렬)",
    },
    justifyContent: {
      control: "select",
      description: "주축 정렬 방식 (세로 정렬)",
    },
    gap: { control: "select" },
    isReverse: { control: "boolean", description: "세로 배치 방향" },
    children: { control: false },
  },
  args: {
    as: "div",
    isReverse: false,
    alignItems: "center",
    gap: "8",
    children: (
      <>
        <Button variant="solid">아이템 1</Button>
        <Button variant="solid">아이템 2</Button>
      </>
    ),
  },
} satisfies Meta<typeof VStack>;

type Story = StoryObj<typeof VStack>;
export const Default: Story = {};

export const Gaps: Story = {
  render: (args) => (
    <VStack gap="8" alignItems="center">
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

export const JustifyContents: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "16" })}>
      <div>
        <h4>start - 시작점 정렬</h4>
        <VStack {...args} justifyContent="start" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <VStack {...args} justifyContent="center" />
      </div>

      <div>
        <h4>end - 끝점 정렬</h4>
        <VStack {...args} justifyContent="flex-end" />
      </div>

      <div>
        <h4>space-between - 양 끝 정렬</h4>
        <VStack {...args} justifyContent="space-between" />
      </div>

      <div>
        <h4>space-around - 균등 분할</h4>
        <VStack {...args} gap={undefined} justifyContent="space-around" />
      </div>
    </div>
  ),
  argTypes: {
    justifyContent: { control: false },
    alignItems: { control: false },
  },
  args: {
    gap: "4",
    className: css({ height: "160" }),
  },
};

export const Reverse: Story = {
  render: (args) => (
    <VStack gap="8" alignItems="center">
      <h4>false</h4>
      <VStack {...args} isReverse={false} />
      <h4>true</h4>
      <VStack {...args} isReverse={true} />
    </VStack>
  ),
  argTypes: {
    isReverse: { control: false },
  },
};

const Item = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={css({
        padding: "16",
        backgroundColor: "bg.neutral.disabled",
        borderRadius: "md",
      })}
    >
      {children}
    </div>
  );
};

export const AlignItems: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(4, 1fr)", gap: "16" })}>
      <div>
        <h4>start - 시작점 정렬</h4>
        <VStack {...args} alignItems="start" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <VStack {...args} alignItems="center" />
      </div>

      <div>
        <h4>end - 끝점 정렬</h4>
        <VStack {...args} alignItems="end" />
      </div>

      <div>
        <h4>stretch - 균등 분할</h4>
        <VStack {...args} alignItems="stretch" />
      </div>
    </div>
  ),
  argTypes: {
    alignItems: { control: false },
    justifyContent: { control: false },
  },
  args: {
    gap: "4",
    className: css({ width: "160" }),
    children: (
      <>
        <Item>아이템 1</Item>
        <Item>아이템 2</Item>
      </>
    ),
  },
};
