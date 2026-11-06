import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { grid, vstack } from "../../../styled-system/patterns";
import { Textarea, type TextareaProps } from "./Textarea";

export default {
  component: Textarea,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/DaleUI-Kit?node-id=9286-431",
    },
  },
  args: {
    placeholder: "내용을 입력해주세요.",
    size: "sm",
    disabled: false,
    invalid: false,
    required: false,
    readOnly: false,
    resizable: true,
  },
  decorators: [
    (Story) => (
      <div className={css({ w: "334px" })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

function LabelledByExample(props: TextareaProps) {
  const [value, setValue] = useState("");
  return (
    <div className={vstack({ gap: "12", alignItems: "stretch" })}>
      <h3
        id="question-title"
        className={css({ textStyle: "heading.5", color: "fg.neutral" })}
      >
        이번 스터디에서 가장 좋았던 점은 무엇인가요?
      </h3>
      <Textarea
        {...props}
        size="lg"
        aria-labelledby="question-title"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

/**
 * 가장 기본적인 Textarea 컴포넌트입니다. `disabled`, `invalid`, `readOnly` 등의 props를 조절해보세요.
 */
export const Default: Story = {
  args: {
    label: "타이틀",
  },
};

/**
 * `size`는 `sm`(기본값)과 `lg`를 지원합니다.
 */
export const Sizes: Story = {
  render: (args) => (
    <div className={vstack({ gap: "16", alignItems: "stretch" })}>
      <Textarea {...args} size="sm" label="sm" />
      <Textarea {...args} size="lg" label="lg" />
    </div>
  ),
  argTypes: {
    size: { control: false },
    label: { control: false },
  },
};

/**
 * `invalid`, `disabled`, `readOnly` 상태를 비교합니다.
 * `invalid`이면서 `errorMessage`가 있으면 `helperText` 대신 오류 메시지가 표시됩니다.
 */
export const States: Story = {
  render: (args) => (
    <div className={grid({ columns: 2, gap: "24" })}>
      <Textarea {...args} label="기본" />
      <Textarea {...args} label="입력됨" defaultValue="입력된 내용" />
      <Textarea
        {...args}
        label="오류"
        invalid
        errorMessage="오류 내용을 입력하세요"
      />
      <Textarea
        {...args}
        label="오류 + 입력됨"
        invalid
        errorMessage="오류 내용을 입력하세요"
        defaultValue="입력된 내용"
      />
      <Textarea {...args} label="비활성화" disabled />
      <Textarea
        {...args}
        label="비활성화 + 입력됨"
        disabled
        defaultValue="입력된 내용"
      />
      <Textarea
        {...args}
        label="읽기 전용"
        readOnly
        defaultValue="읽기 전용 값"
      />
    </div>
  ),
  decorators: [
    (Story) => (
      <div className={css({ w: "692px" })}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: false },
    invalid: { control: false },
    disabled: { control: false },
    readOnly: { control: false },
  },
};

/**
 * `showCount`로 글자 수 카운터를 표시합니다. `maxLength`가 있으면 `현재 / 최대` 형식으로 보여주고 그 이상 입력되지 않습니다.
 * 카운터는 `helperText`, `errorMessage`와 같은 줄 오른쪽에 표시됩니다.
 */
export const WithCount: Story = {
  args: {
    label: "타이틀",
    maxLength: 100,
    showCount: true,
    helperText: "도움말을 입력하세요",
  },
};

/**
 * `resizable`을 `false`로 두면 사용자가 크기를 조절할 수 없습니다. 기본값은 `true`이며 세로로만 늘릴 수 있습니다.
 */
export const NotResizable: Story = {
  args: {
    label: "타이틀",
    resizable: false,
  },
};

/**
 * 화면에 이미 레이블 역할을 하는 제목이 있다면 `label` 대신 `aria-labelledby`로 연결합니다.
 * 설문 응답 화면의 서술형 문항처럼 질문 제목이 레이블을 대신하는 경우에 사용합니다.
 */
export const LabelledBy: Story = {
  render: (args) => <LabelledByExample {...args} />,
  argTypes: {
    size: { control: false },
  },
};
