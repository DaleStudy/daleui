import type { Meta, StoryObj } from "@storybook/react-vite";
import { HStack } from "./HStack";
import { css } from "../../../styled-system/css";
import { grid, vstack } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";
import { VStack } from "../VStack/VStack";

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
  title: "Components/HStack",
  component: HStack,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: false },
    gap: { control: "select", options: Object.keys(spacing || {}) },
    className: { control: false },
    role: { control: "text" },
  },
  args: {
    as: "div",
    reversed: false,
    justify: "left",
    align: "center",
    gap: "8",
    children: (
      <>
        <Item>아이템 1</Item>
        <Item>아이템 2</Item>
      </>
    ),
    className: css({ width: "240", height: "120" }),
  },
} satisfies Meta<typeof HStack>;

type Story = StoryObj<typeof HStack>;
export const Default: Story = {};

export const Gaps: Story = {
  render: (args) => (
    <VStack gap="24">
      <div>
        <h4>간격 4</h4>
        <HStack {...args} gap="4" className={css({ width: "400" })} />
      </div>
      <div>
        <h4>간격 8</h4>
        <HStack {...args} gap="8" className={css({ width: "400" })} />
      </div>
      <div>
        <h4>간격 16</h4>
        <HStack {...args} gap="16" className={css({ width: "400" })} />
      </div>
    </VStack>
  ),
  argTypes: {
    children: { control: false },
    gap: { control: false },
  },
};

export const Reverse: Story = {
  render: (args) => (
    <VStack gap="24">
      <div>
        <h4>false</h4>
        <HStack {...args} reversed={false} className={css({ width: "400" })} />
      </div>
      <div>
        <h4>true</h4>
        <HStack {...args} reversed={true} className={css({ width: "400" })} />
      </div>
    </VStack>
  ),
  argTypes: {
    reversed: { control: false },
  },
};

export const Justify: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "16" })}>
      <div>
        <h4>left - 왼쪽 정렬</h4>
        <HStack {...args} justify="left" />
      </div>
      <div>
        <h4>right - 오른쪽 정렬</h4>
        <HStack {...args} justify="right" />
      </div>
      <div>
        <h4>center - 중앙 정렬</h4>
        <HStack {...args} justify="center" />
      </div>
      <div>
        <h4>between - 양 끝 정렬</h4>
        <HStack {...args} justify="between" />
      </div>
      <div>
        <h4>around - 균등 분산</h4>
        <HStack {...args} justify="around" />
      </div>
    </div>
  ),
  argTypes: {
    justify: { control: false },
  },
};

export const Align: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "16" })}>
      <div>
        <h4>top - 위쪽 정렬</h4>
        <HStack {...args} align="top" />
      </div>

      <div>
        <h4>bottom - 아래쪽 정렬</h4>
        <HStack {...args} align="bottom" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <HStack {...args} align="center" />
      </div>

      <div>
        <h4>stretch - 늘리기</h4>
        <HStack {...args} align="stretch" />
      </div>
      <div className={vstack({ height: "100" })}>test</div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
};
