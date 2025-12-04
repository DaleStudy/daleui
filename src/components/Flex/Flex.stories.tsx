import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "./Flex";
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
  component: Flex,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: false },

    direction: {
      description: "Flex 방향",
    },
    justify: {
      description: "주축 정렬 방식",
    },
    align: {
      description: "교차축 정렬 방식",
    },
    gap: { control: "select", options: Object.keys(spacing || {}) },
    className: { control: false },
  },
  args: {
    as: "div",
    direction: "row",
    justify: "start",
    align: "stretch",
    className: css({ width: "400", height: "200" }),
    gap: "8",
    children: (
      <>
        <Item>아이템 1</Item>
        <Item>아이템 2</Item>
        <Item>아이템 3</Item>
      </>
    ),
  },
} satisfies Meta<typeof Flex>;

type Story = StoryObj<typeof Flex>;

export const Default: Story = {};

export const Direction: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
      <div>
        <h4>row - 가로 방향</h4>
        <Flex {...args} direction="row" />
      </div>
      <div>
        <h4>column - 세로 방향</h4>
        <Flex {...args} direction="column" />
      </div>
      <div>
        <h4>rowReverse - 가로 역방향</h4>
        <Flex {...args} direction="rowReverse" />
      </div>
      <div>
        <h4>columnReverse - 세로 역방향</h4>
        <Flex {...args} direction="columnReverse" />
      </div>
    </div>
  ),
  argTypes: {
    direction: { control: false },
  },
};

export const Gaps: Story = {
  render: (args) => (
    <div>
      <div>
        <h4>간격 8</h4>
        <Flex {...args} gap="8" />
      </div>
      <div>
        <h4>간격 16</h4>
        <Flex {...args} gap="16" />
      </div>
    </div>
  ),
  argTypes: {
    children: { control: false },
    gap: { control: false },
  },
  args: {},
};

export const Justify: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
      <div>
        <h4>start - 시작점 정렬</h4>
        <Flex {...args} justify="start" />
      </div>
      <div>
        <h4>center - 중앙 정렬</h4>
        <Flex {...args} justify="center" />
      </div>
      <div>
        <h4>end - 끝점 정렬</h4>
        <Flex {...args} justify="end" />
      </div>
      <div>
        <h4>between - 양 끝 정렬</h4>
        <Flex {...args} justify="between" />
      </div>
    </div>
  ),
  argTypes: {
    justify: { control: false },
  },
  args: {
    gap: "4",
  },
};

export const Align: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(2, 1fr)", gap: "24" })}>
      <div>
        <h4>start - 시작점 정렬</h4>
        <Flex {...args} align="start" />
      </div>
      <div>
        <h4>center - 중앙 정렬</h4>
        <Flex {...args} align="center" />
      </div>
      <div>
        <h4>end - 끝점 정렬</h4>
        <Flex {...args} align="end" />
      </div>
      <div>
        <h4>stretch - 늘리기</h4>
        <Flex {...args} align="stretch" />
      </div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
  args: {
    gap: "4",
  },
};
