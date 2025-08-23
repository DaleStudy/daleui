import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Label } from "./Label";
import { TextInput } from "../TextInput/TextInput";

export default {
  component: Label,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1930-994&p=f&m=dev",
    },
  },
  args: {
    labelText: "타이틀",
    tone: "neutral",
    variant: "default",
    disabled: false,
    description: "",
  },
} satisfies Meta<typeof Label>;

export const Basic: StoryObj<typeof Label> = {};

export const Tones: StoryObj<typeof Label> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Label {...args} tone="neutral" labelText="중립 색조 라벨"></Label>
        <Label {...args} tone="danger" labelText="위험 색조 라벨"></Label>
      </div>
    );
  },
  argTypes: {
    labelText: {
      control: false,
    },
    tone: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const Disabled: StoryObj<typeof Label> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Label {...args} disabled={false} labelText="활성화 라벨"></Label>
        <Label {...args} disabled={true} labelText="비활성화 라벨"></Label>
      </div>
    );
  },
  argTypes: {
    labelText: {
      control: false,
    },
    disabled: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const Variants: StoryObj<typeof Label> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Label {...args} variant="default" labelText="기본 라벨"></Label>
        <Label {...args} variant="required" labelText="필수 라벨"></Label>
        <Label {...args} variant="optional" labelText="선택 라벨"></Label>
      </div>
    );
  },
  argTypes: {
    labelText: {
      control: false,
    },
    variant: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const Description: StoryObj<typeof Label> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Label
          {...args}
          labelText="보조설명문 있는 라벨"
          description="보조설명문"
        ></Label>
        <Label {...args} labelText="보조설명문 없는 라벨"></Label>
      </div>
    );
  },
  argTypes: {
    labelText: {
      control: false,
    },
    description: {
      control: false,
    },
    children: {
      control: false,
    },
  },
};

export const WithTextInput: StoryObj<typeof Label> = {
  args: {
    description: "가이드라인을 적어주세요",
  },

  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Label {...args}>
          <TextInput placeholder="내용을 입력해주세요"></TextInput>
        </Label>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    htmlFor: {
      control: false,
    },
  },
};
