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
    loading: false,
    tone: "brand",
  },
  argTypes: {
    variant: {
      description: "버튼의 스타일 종류",
    },
    tone: {
      description:
        "색상 강조"
        // (⚠️ solid: brand/neutral/danger, outline: brand만, ghost: neutral/danger만 지원)",
    },
  },
} satisfies Meta<typeof Button>;

export const Basic: StoryObj<typeof Button> = {};

// Brand Tone - solid, outline, ghost 지원
export const ToneBrand: StoryObj<typeof Button> = {
  args: {
    tone: "brand",
    variant: "solid",
  },
  argTypes: {
    tone: {
      control: false,
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
      description: "brand tone은 solid, outline, ghost를 지원합니다",
    },
  },
};

// Neutral Tone - solid, outline, ghost 지원
export const ToneNeutral: StoryObj<typeof Button> = {
  args: {
    tone: "neutral",
    variant: "ghost",
  },
  argTypes: {
    tone: {
      control: false,
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
      description: "neutral tone은 solid, outline, ghost를 지원합니다",
    },
  },
};

// Danger Tone - solid, outline, ghost 지원
export const ToneDanger: StoryObj<typeof Button> = {
  args: {
    tone: "danger",
    variant: "ghost",
  },
  argTypes: {
    tone: {
      control: false,
    },
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
      description: "danger tone은 solid, outline, ghost를 지원합니다",
    },
  },
};

export const Variants: StoryObj<typeof Button> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Button {...args} tone="brand" variant="solid">
          솔리드 버튼
        </Button>
        <Button {...args} tone="brand" variant="outline">
          아웃라인 버튼
        </Button>
        <Button {...args} tone="neutral" variant="ghost">
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
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div style={{ border: "2px dashed #ccc", width: "300px" }}>
          <Button {...args}>일반 버튼</Button>
        </div>
        <div style={{ border: "2px dashed #ccc", width: "300px" }}>
          <Button {...args} fullWidth>
            가득찬 버튼
          </Button>
        </div>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    fullWidth: {
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

export const Loading: StoryObj<typeof Button> = {
  args: {
    loading: true,
  },
  render: (args) => {
    return <Button {...args}>로딩 버튼</Button>;
  },
  argTypes: {
    children: {
      control: false,
    },
  },
};
