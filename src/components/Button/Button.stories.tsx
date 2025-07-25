import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { vstack } from "../../../styled-system/patterns";

export default {
  component: Button,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=0-1",
    },
  },
  args: {
    children: "시작하기",
    variant: "solid",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export const Basic: StoryObj<typeof Button> = {};

export const Variants: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
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
      <div className={vstack({ gap: "16" })}>
        <Button {...args} variant="solid" tone="brand">
          브랜드 색조
        </Button>
        <Button {...args} variant="solid" tone="neutral">
          중립 색조
        </Button>
        <Button {...args} variant="solid" tone="danger">
          위험 색조
        </Button>
        <Button {...args} variant="solid" tone="success">
          성공 색조
        </Button>
        <Button {...args} variant="solid" tone="warning">
          경고 색조
        </Button>
        <Button {...args} variant="solid" tone="info">
          정보 색조
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
      <div className={vstack({ gap: "16" })}>
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
      <div className={vstack({ gap: "16" })}>
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
