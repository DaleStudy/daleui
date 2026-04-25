import type { Meta, StoryObj } from "@storybook/react";
import { vstack } from "../../../styled-system/patterns";
import { Checkbox } from "./Checkbox";

export default {
  component: Checkbox,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=851-1768",
    },
  },
  args: {
    label: "기본 체크박스",
    tone: "brand",
    checked: undefined,
    defaultChecked: false,
    disabled: false,
    invalid: false,
    required: false,
  },
} satisfies Meta<typeof Checkbox>;

export const Basic: StoryObj<typeof Checkbox> = {};

export const Tones: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox {...args} label="중립 톤" tone="neutral" />
        <Checkbox {...args} label="브랜드 톤" tone="brand" />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
  },
};

export const Disabled: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          label="체크할 수 없습니다."
          disabled
          defaultChecked
        />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
  },
};

export const Invalid: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          label="에러 상태 체크박스"
          invalid
          errorMessage="필수 항목입니다."
        />
        <Checkbox
          {...args}
          label="에러 상태 체크박스 (체크됨)"
          invalid
          defaultChecked
          errorMessage="필수 항목입니다."
        />
        <Checkbox {...args} label="정상 체크박스" />
        <Checkbox {...args} label="체크해주세요." invalid />
      </div>
    );
  },
  argTypes: {
    label: {
      control: false,
    },
    invalid: {
      control: false,
    },
  },
};

export const HelperText: StoryObj<typeof Checkbox> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Checkbox
          {...args}
          label="서비스 이용약관에 동의합니다"
          helperText="동의하지 않으면 서비스를 이용할 수 없습니다."
        />
        <Checkbox
          {...args}
          label="마케팅 정보 수신에 동의합니다"
          helperText="선택 사항입니다."
        />
      </div>
    );
  },
  argTypes: {
    label: { control: false },
    helperText: { control: false },
  },
};

export const Required: StoryObj<typeof Checkbox> = {
  args: {
    label: "필수 체크박스",
    required: true,
  },
  argTypes: {
    checked: {
      control: false,
    },
    label: {
      control: false,
    },
    defaultChecked: {
      control: false,
    },
    invalid: {
      control: false,
    },
    disabled: {
      control: false,
    },
    name: {
      control: false,
    },
  },
};
