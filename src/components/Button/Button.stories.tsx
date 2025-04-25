import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { vstack } from "../../../styled-system/patterns";

export default {
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      // TODO: 임시 url이므로 button 컴포넌트가 완성되면 교체해줄 것
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/NoName-Design-System?node-id=11-343",
    },
  },
  args: {
    children: "시작하기",
    variant: "solid",
  },
} satisfies Meta<typeof Button>;

export const Basic: StoryObj<typeof Button> = {};

export const Variants: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.sm" })}>
        <Button {...args} variant="solid">
          솔리드 버튼
        </Button>
        <Button {...args} variant="outline">
          아웃라인 버튼
        </Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    variant: {
      control: false,
    },
  },
};

export const Tones: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.sm" })}>
        <Button {...args} tone="neutral">
          중립 색조
        </Button>
        <Button {...args} tone="accent">
          강조 색조
        </Button>
        <Button {...args} tone="danger">
          위험 색조
        </Button>
        <Button {...args} tone="warning">
          경고 색조
        </Button>
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

export const Sizes: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.sm" })}>
        <Button {...args} size="sm">
          작은 버튼
        </Button>
        <Button {...args} size="md">
          중간 버튼
        </Button>
        <Button {...args} size="lg">
          큰 버튼
        </Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: false,
    },
  },
};

export const Disabled: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "gap.sm" })}>
        <Button {...args} disabled>
          비활성화 버튼
        </Button>
        <Button {...args}>활성화 버튼</Button>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    disabled: {
      control: false,
    },
  },
};
