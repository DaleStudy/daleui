import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import { hstack, vstack } from "../../../styled-system/patterns";
import { Badge } from "./Badge";

export default {
  component: Badge,
  parameters: {
    layout: "centered",
  },
  args: {
    children: "배지",
    variant: "solid",
    removable: false,
    link: false,
  },
} satisfies Meta<typeof Badge>;

export const Basic: StoryObj<typeof Badge> = {};

export const Variants: StoryObj<typeof Badge> = {
  render: (args) => {
    return (
      <div className={hstack({ gap: "16" })}>
        <Badge {...args} variant="solid">
          솔리드 배지
        </Badge>
        <Badge {...args} variant="outline">
          아웃라인 배지
        </Badge>
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

export const States: StoryObj<typeof Badge> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={hstack({ gap: "8" })}>
          <Badge {...args} variant="solid">
            기본 상태
          </Badge>
          <Badge {...args} variant="solid" link>
            링크 상태
          </Badge>
        </div>
        <div className={hstack({ gap: "8" })}>
          <Badge {...args} variant="outline">
            기본 상태
          </Badge>
          <Badge {...args} variant="outline" link>
            링크 상태
          </Badge>
        </div>
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
    link: {
      control: false,
    },
  },
};

export const Removable: StoryObj<typeof Badge> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={hstack({ gap: "8" })}>
          <Badge
            {...args}
            variant="solid"
            removable
            onRemove={action("onRemove")}
          >
            제거 가능 솔리드
          </Badge>
          <Badge
            {...args}
            variant="solid"
            removable
            link
            onClick={action("onClick")}
            onRemove={action("onRemove")}
          >
            제거 가능 + 링크 솔리드
          </Badge>
        </div>
        <div className={hstack({ gap: "8" })}>
          <Badge
            {...args}
            variant="outline"
            removable
            onRemove={action("onRemove")}
          >
            제거 가능 아웃라인
          </Badge>
          <Badge
            {...args}
            variant="outline"
            removable
            link
            onClick={action("onClick")}
            onRemove={action("onRemove")}
          >
            제거 가능 + 링크 아웃라인
          </Badge>
        </div>
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
    removable: {
      control: false,
    },
    link: {
      control: false,
    },
  },
};

export const Interactive: StoryObj<typeof Badge> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <Badge {...args} variant="solid" link onClick={action("onClick")}>
          클릭 가능한 배지
        </Badge>
        <Badge
          {...args}
          variant="outline"
          removable
          onRemove={action("onRemove")}
        >
          제거 가능한 배지
        </Badge>
        <Badge
          {...args}
          variant="solid"
          link
          removable
          onClick={action("onClick")}
          onRemove={action("onRemove")}
        >
          클릭 + 제거 가능한 배지
        </Badge>
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
    removable: {
      control: false,
    },
    link: {
      control: false,
    },
    onClick: {
      control: false,
    },
    onRemove: {
      control: false,
    },
  },
};
