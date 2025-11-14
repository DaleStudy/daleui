import type { Meta, StoryObj } from "@storybook/react-vite";
import { HStack } from "./HStack";
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
  title: "Components/HStack",
  component: HStack,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { control: false },
    as: { control: "select" },
    align: {
      control: "select",
      options: ["left", "center", "right", "between", "around"],
      description: "가로 정렬 방식",
    },
    reversed: { control: "boolean", description: "가로 배치 방향" },
    gap: { control: "select", options: Object.keys(spacing || {}) },
    className: { control: false },
  },
  args: {
    as: "div",
    reversed: false,
    gap: "8",
    children: (
      <>
        <Item>아이템 1</Item>
        <Item>아이템 2</Item>
      </>
    ),
  },
} satisfies Meta<typeof HStack>;

type Story = StoryObj<typeof HStack>;
export const Default: Story = {
  args: {
    className: css({ width: "400" }),
  },
};

export const Gaps: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateRows: "repeat(3, 1fr)", gap: "16" })}>
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
    </div>
  ),
  argTypes: {
    children: { control: false },
    gap: { control: false },
  },
};

export const Reverse: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateRows: "repeat(2, 1fr)", gap: "16" })}>
      <div>
        <h4>false</h4>
        <HStack {...args} reversed={false} className={css({ width: "400" })} />
      </div>
      <div>
        <h4>true</h4>
        <HStack {...args} reversed={true} className={css({ width: "400" })} />
      </div>
    </div>
  ),
  argTypes: {
    reversed: { control: false },
  },
};

export const Align: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateRows: "repeat(5, 1fr)", gap: "16" })}>
      <div>
        <h4>left - 왼쪽 정렬</h4>
        <HStack {...args} align="left" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <HStack {...args} align="center" />
      </div>

      <div>
        <h4>right - 오른쪽 정렬</h4>
        <HStack {...args} align="right" />
      </div>

      <div>
        <h4>between - 양 끝 정렬</h4>
        <HStack {...args} align="between" />
      </div>

      <div>
        <h4>around - 균등 분산</h4>
        <HStack {...args} align="around" />
      </div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
  args: {
    gap: "4",
    className: css({ width: "400" }),
  },
};
