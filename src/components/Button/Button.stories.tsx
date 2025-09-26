import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Button } from "./Button";

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
    fullWidth: false,
  },
  argTypes: {
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
    variant: {
      control: "select",
      description: "버튼의 스타일 종류",
    },
    size: {
      control: "select",
      description: "버튼의 크기",
    },
    tone: {
      control: "select",
      description: "버튼의 색상 강조",
    },
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
        <Button {...args} variant="ghost">
          고스트 버튼
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
        <Button {...args} tone="brand">
          브랜드 색조
        </Button>
        <Button {...args} tone="neutral">
          중립 색조
        </Button>
        <Button {...args} tone="danger">
          위험 색조
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
        <Button {...args}>활성화 버튼</Button>
        <Button {...args} disabled>
          비활성화 버튼
        </Button>
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

export const FullWidth: StoryObj<typeof Button> = {
  args: {
    fullWidth: true,
  },
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div style={{ border: "2px dashed #ccc", width: "300px" }}>
          <Button {...args}>가득찬 버튼</Button>
        </div>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
  },
};

export const WithIcons: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Button {...args} leftIcon="star">
          좌측 아이콘
        </Button>
        <Button {...args} rightIcon="search">
          우측 아이콘
        </Button>
        <Button {...args} leftIcon="star" rightIcon="search">
          양쪽 아이콘
        </Button>
        <Button {...args} leftIcon="star" rightIcon="search" disabled>
          양쪽 아이콘 비활성화
        </Button>
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
