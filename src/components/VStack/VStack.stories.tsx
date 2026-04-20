import type { Meta, StoryObj } from "@storybook/react-vite";
import { VStack } from "./VStack";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";
import { HStack } from "../HStack/HStack";
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
  title: "Components/VStack",
  component: VStack,
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
    justify: "top",
    align: "center",
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
    <HStack gap="24">
      <div>
        <h4>간격 4</h4>
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

export const Padding: Story = {
  render: (args) => (
    <HStack gap="24">
      <div>
        <h4>padding: 16</h4>
        <VStack {...args} padding="16" />
      </div>
      <div>
        <h4>padding: 32</h4>
        <VStack {...args} padding="32" />
      </div>
    </HStack>
  ),
  argTypes: {
    padding: { control: false },
  },
};

export const Reverse: Story = {
  render: (args) => (
    <HStack gap="24">
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

export const Justify: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(3, 1fr)", gap: "16" })}>
      <div>
        <h4>top - 위쪽 정렬</h4>
        <VStack {...args} justify="top" />
      </div>

      <div>
        <h4>bottom - 아래쪽 정렬</h4>
        <VStack {...args} justify="bottom" />
      </div>

      <div>
        <h4>center - 중앙 정렬</h4>
        <VStack {...args} justify="center" />
      </div>

      <div>
        <h4>between - 양 끝 정렬</h4>
        <VStack {...args} justify="between" />
      </div>
      <div>
        <h4>around - 균등 분산</h4>
        <VStack {...args} justify="around" />
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
        <h4>stretch - 늘리기</h4>
        <VStack {...args} align="stretch" />
      </div>
    </div>
  ),
  argTypes: {
    align: { control: false },
  },
};

export const FlexOrVStackGuide: Story = {
  render: (args) => (
    <Flex direction="column" gap="24">
      <p>
        VStack은 Flex의 자주 쓰는 세로 배치 패턴(`flex-direction="column"`,
        `justify-content="start"`, `align-items="center"`)을 의미 있는 이름과
        기본값으로 묶은 컴포넌트입니다.
        <br />
        단순 세로 스택은 `VStack`을, 방향 전환이나 세밀한 정렬 제어가 필요하면
        `Flex`를 사용하세요.
        <br />
        아래 예시처럼 같은 결과를 만들 수 있지만, 전달해야 하는 props가
        줄어듭니다.
      </p>
      <div className={css({ border: "1px solid", padding: "16" })}>
        <h4>Flex</h4>
        <p>direction="column" justify="start" align="center" gap="8"</p>
        <Flex
          direction="column"
          justify="start"
          align="center"
          gap="8"
          children={args.children}
        />
      </div>
      <div className={css({ border: "1px solid", padding: "16" })}>
        <h4>VStack</h4>
        <p>gap="8"</p>
        <VStack gap="8" children={args.children} />
      </div>
    </Flex>
  ),
};
