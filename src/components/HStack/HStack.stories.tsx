import type { Meta, StoryObj } from "@storybook/react-vite";
import { HStack } from "./HStack";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";
import { VStack } from "../VStack/VStack";
import { Flex } from "../Flex/Flex";

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
    padding: { control: "select", options: Object.keys(spacing || {}) },
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

export const Padding: Story = {
  render: (args) => (
    <VStack gap="24">
      <div>
        <h4>padding: 16</h4>
        <HStack {...args} padding="16" className={css({ width: "400" })} />
      </div>
      <div>
        <h4>padding: 32</h4>
        <HStack {...args} padding="32" className={css({ width: "400" })} />
      </div>
    </VStack>
  ),
  argTypes: {
    children: { control: false },
    padding: { control: false },
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
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
};

export const FlexOrHStackGuide: Story = {
  render: (args) => (
    <Flex direction="column" gap="24">
      <p>
        HStack은 Flex의 자주 쓰는 가로 배치 패턴(`flex-direction="row"`,
        `justify-content="start"`, `align-items="center"`)을 의미 있는 이름과
        기본값으로 묶은 컴포넌트입니다.
        <br />
        단순 가로 스택은 `HStack`을, 방향 전환이나 세밀한 정렬 제어가 필요하면
        `Flex`를 사용하세요.
        <br />
        아래 예시처럼 같은 결과를 만들 수 있지만, 전달해야 하는 props가
        줄어듭니다.
      </p>
      <div className={css({ border: "1px solid", padding: "16" })}>
        <h4>Flex</h4>
        <p>direction="row" justify="start" align="center" gap="8"</p>
        <Flex
          direction="row"
          justify="start"
          align="center"
          gap="8"
          children={args.children}
        />
      </div>
      <div className={css({ border: "1px solid", padding: "16" })}>
        <h4>HStack</h4>
        <p>gap="8"</p>
        <HStack {...args} gap="8" />
      </div>
    </Flex>
  ),
};
