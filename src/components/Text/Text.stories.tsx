import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "../../../styled-system/css";
import { vstack } from "../../../styled-system/patterns";
import { Heading } from "../Heading/Heading";
import { Text } from "./Text";

export default {
  component: Text,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "본문",
  },
  argTypes: {
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Text>;

export const Basic: StoryObj<typeof Text> = {};

/** 여러 줄로 이어지는 긴 본문에서 기본 행간이 어떻게 보이는지 확인할 수 있습니다. */
export const Paragraph: StoryObj<typeof Text> = {
  args: {
    as: "p",
    children:
      "달레 UI는 한국어를 쓰는 사람이 만들고 한국어를 쓰는 사람이 사용하는 디자인 시스템입니다. " +
      "글자 크기나 굵기를 따로 지정하지 않아도 본문에 어울리는 크기와 행간이 적용되므로, " +
      "긴 문단을 그대로 넣어도 줄과 줄 사이가 답답하지 않습니다.",
  },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => <div className={css({ maxWidth: "480px" })}>{Story()}</div>,
  ],
};

/** 인라인 본문, 의미 태그, 제목과 코드 문맥의 타이포그래피를 유지합니다. */
export const Inheritance: StoryObj<typeof Text> = {
  render: () => (
    <div className={vstack({ gap: "24", alignItems: "flex-start" })}>
      <p>
        본문 문단 안의 <Text>인라인 텍스트</Text>
      </p>
      <p>
        <Text as="strong">강조 텍스트</Text>
        {" · "}
        <Text as="small">작은 텍스트</Text>
      </p>
      <Heading level={2}>
        제목 안의 <Text>제목 텍스트</Text>
      </Heading>
      <div className={css({ fontFamily: "mono" })}>
        <Text>const inheritedFont = true;</Text>
      </div>
    </div>
  ),
};

/** 명시적 크기·굵기와 사용자 클래스는 기본 색조와 함께 적용됩니다. */
export const Overrides: StoryObj<typeof Text> = {
  render: () => (
    <div className={vstack({ gap: "24", alignItems: "flex-start" })}>
      <Text as="strong" weight="normal">
        굵기를 직접 지정한 강조 텍스트
      </Text>
      <Text as="small" size="lg">
        크기를 직접 지정한 작은 텍스트
      </Text>
      <Heading level={2}>
        <Text size="md" weight="normal">
          제목 안에서 크기와 굵기를 직접 지정한 텍스트
        </Text>
      </Heading>
      <Text tone="brand" className={css({ fontStyle: "italic" })}>
        사용자 클래스와 브랜드 색조
      </Text>
    </div>
  ),
};

export const Tones: StoryObj<typeof Text> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Text {...args} tone="neutral">
          중립 색조
        </Text>
        <Text {...args} tone="brand">
          브랜드 색조
        </Text>
        <Text {...args} tone="danger">
          위험 색조
        </Text>
        {/* <Text {...args} tone="warning">
          경고 색조
        </Text> */}
        <Text {...args} tone="success">
          성공 색조
        </Text>
        <Text {...args} tone="info">
          정보 색조
        </Text>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    tone: {
      control: false,
    },
  },
};

export const Contrasts: StoryObj<typeof Text> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Text {...args} muted>
          낮은 명암비
        </Text>
        <Text {...args}>높은 명암비</Text>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    muted: {
      control: false,
    },
  },
};
