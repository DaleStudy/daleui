import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Select } from "./Select";
import { Button } from "../Button/Button";
import { VStack } from "../VStack/VStack";

export default {
  component: Select,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=5152-7407&m=dev",
    },
  },
  decorators: [
    (Story) => (
      <div className={css({ w: "280px" })}>
        <Story />
      </div>
    ),
  ],
  args: {
    disabled: false,
    required: false,
    invalid: false,
    placeholder: "국가를 선택하세요",
    "aria-label": "국가를 선택하세요",
    children: (
      <>
        <option value="kr">대한민국</option>
        <option value="ca">캐나다</option>
        <option value="us">미국</option>
        <option value="jp">일본</option>
        <option value="cn">중국</option>
        <option value="gb">영국</option>
        <option value="fr">프랑스</option>
        <option value="de">독일</option>
        <option value="it">이탈리아</option>
        <option value="es">스페인</option>
        <option value="au">호주</option>
        <option value="br">브라질</option>
      </>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
    onChange: {
      control: false,
    },
    ref: {
      control: false,
    },
    name: {
      control: false,
    },
  },
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof Select>;

/**
 * 가장 기본적인 Select 컴포넌트입니다.
 * placeholder를 통해 사용자에게 안내할 수 있습니다.
 */
export const Default: Story = {};

/**
 * `disabled` prop을 `true`로 설정하면 선택이 비활성화됩니다.
 */
export const Disabled: Story = {
  render: (args) => (
    <VStack gap="16">
      <Select {...args} defaultValue="kr" />
      <Select {...args} placeholder="비활성화된 선택" />
      <Select {...args} disabled={false} placeholder="일부 옵션을 disabled">
        <option value="ko">대한민국</option>
        <option value="ca">캐나다</option>
        <option value="us" disabled>
          미국
        </option>
        <option value="jp" disabled>
          일본
        </option>
        <option value="cn">중국</option>
        <option value="gb">영국</option>
      </Select>
    </VStack>
  ),
  argTypes: {
    disabled: {
      control: false,
    },
  },
  args: {
    disabled: true,
  },
};

/**
 * `invalid` prop을 `true`로, `errorMessage`로 오류 메시지를 표시할 수 있습니다.
 */
export const Invalid: Story = {
  args: {
    invalid: true,
    errorMessage: "올바른 국가를 선택해주세요.",
  },
  argTypes: {
    invalid: {
      control: false,
    },
  },
};

const RequiredSelect = (args: React.ComponentProps<typeof Select>) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const isValid = form.checkValidity();
    setIsInvalid(!isValid);
    action("form-submit")(`선택된 값: ${form.framework.value || "없음"}`);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={css({ spaceY: "16" })}>
      <Select {...args} invalid={isInvalid} />
      {isInvalid && (
        <div className={css({ mt: "16", fontSize: "sm", color: "fg.danger" })}>
          <p>필수 항목을 선택해주세요.</p>
        </div>
      )}
      <Button type="submit">제출</Button>
    </form>
  );
};

/**
 * `required` prop을 `true`로 설정하면 필수 입력임을 나타냅니다.
 */
export const Required: Story = {
  render: (args) => <RequiredSelect {...args} />,
  argTypes: {
    required: {
      control: false,
    },
  },
  args: {
    required: true,
    clearButtonName: "clear",
    name: "framework",
  },
};

/**
 * `clearable` prop을 `true`로 설정하면 선택된 값이 있을 때 지우기 버튼이 표시됩니다.
 */
export const Clearable: Story = {
  argTypes: {
    clearButtonName: {
      control: false,
    },
  },
  args: {
    clearButtonName: "clear",
    placeholder: "값이 없을 때는 버튼이 안 보입니다",
  },
};

/**
 * `helperText` prop으로 입력 도움말을 표시합니다.
 */
export const HelperText: Story = {
  args: {
    helperText: "거주하는 국가를 선택해주세요.",
  },
};

/**
 * `label` prop으로 레이블을 표시하고 select와 연결합니다.
 */
export const WithLabel: Story = {
  render: (args) => (
    <VStack gap="16">
      <Select {...args} label="국가" />
      <Select {...args} label="국가" required />
      <Select {...args} label="국가" disabled />
    </VStack>
  ),
  argTypes: {
    label: { control: false },
    required: { control: false },
    disabled: { control: false },
  },
};

/**
 * 텍스트가 너무 길 때 ellipsis 처리됩니다.
 */
export const OverflowText: Story = {
  args: {
    placeholder: "오버플로우 처리가 제대로 되는지 확인할 수 있습니다.",
    clearButtonName: "clear",
    children: (
      <>
        <option value="ko">
          대한민국은 동아시아에 위치한 국가로 수도는 서울입니다.
        </option>
        <option value="ca">
          캐나다는 북미 대륙에 위치한 국가로 수도는 오타와입니다.
        </option>
      </>
    ),
  },
};
