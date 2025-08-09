import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "../../../styled-system/css";
import { hstack, vstack } from "../../../styled-system/patterns";
import { Tag } from "./Tag";

export default {
  component: Tag,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1906-1035&t=hkjHysQiJbNEnBw1-0",
    },
  },
  args: {
    children: "태그",
    tone: "neutral",
    removable: false,
    link: false,
  },
} satisfies Meta<typeof Tag>;

export const Basic: StoryObj<typeof Tag> = {};

export const Tones: StoryObj<typeof Tag> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={hstack({ gap: "8" })}>
          <Tag {...args} tone="neutral">
            Neutral
          </Tag>
          <Tag {...args} tone="brand">
            Brand
          </Tag>
          <Tag {...args} tone="danger">
            Danger
          </Tag>
        </div>
        <div className={hstack({ gap: "8" })}>
          <Tag {...args} tone="warning">
            Warning
          </Tag>
          <Tag {...args} tone="success">
            Success
          </Tag>
          <Tag {...args} tone="info">
            Info
          </Tag>
        </div>
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

export const Link: StoryObj<typeof Tag> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={hstack({ gap: "8" })}>
          <Tag {...args}>기본 태그</Tag>
          <Tag {...args} link>
            링크 태그 (호버 해보세요)
          </Tag>
          <Tag
            {...args}
            {...({
              link: true,
              href: "https://example.com",
              target: "_blank",
            } as const)}
          >
            외부 링크 태그
          </Tag>
        </div>
        <div>
          <p
            className={css({
              fontSize: "sm",
              color: "fg.neutral",
              marginTop: "8",
            })}
          >
            링크 태그는 마우스를 올리거나 키보드로 포커스할 때 상호작용 상태를
            보여줍니다. 세 번째 태그는 실제 외부 링크로 연결됩니다.
          </p>
        </div>
      </div>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    link: {
      control: false,
    },
  },
};

export const Removable: StoryObj<typeof Tag> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "16" })}>
        <div>
          <h3
            className={css({
              marginBottom: "8",
              fontSize: "sm",
              fontWeight: "semibold",
            })}
          >
            제거 가능한 태그들 (X 버튼 클릭 시 제거됨)
          </h3>
          <div className={hstack({ gap: "8" })}>
            <Tag {...args} tone="brand" removable>
              제거 가능 태그
            </Tag>
            <Tag {...args} tone="success" removable>
              제거 가능 + 성공 톤
            </Tag>
            <Tag {...args} tone="danger" removable>
              제거 가능 + 위험 톤
            </Tag>
          </div>
          <p
            className={css({
              fontSize: "sm",
              color: "fg.neutral",
              marginTop: "8",
            })}
          >
            각 태그의 X 버튼을 클릭하면 해당 태그가 제거됩니다.
          </p>
        </div>
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
    removable: {
      control: false,
    },
  },
};

export const Interactive: StoryObj<typeof Tag> = {
  render: (args) => {
    const handleTagClick = (tagText: string) => {
      alert(`"${tagText}" 태그를 클릭했습니다! (제거되지 않음)`);
    };

    return (
      <div className={vstack({ gap: "16" })}>
        <div>
          <h3
            className={css({
              marginBottom: "8",
              fontSize: "sm",
              fontWeight: "semibold",
            })}
          >
            링크 태그 (클릭 가능)
          </h3>
          <Tag {...args} tone="brand" link>
            클릭 가능한 태그
          </Tag>
        </div>

        <div>
          <h3
            className={css({
              marginBottom: "8",
              fontSize: "sm",
              fontWeight: "semibold",
            })}
          >
            제거 가능한 태그 (X 버튼으로만 제거됨)
          </h3>
          <div className={hstack({ gap: "8" })}>
            <Tag
              {...args}
              tone="danger"
              removable
              onClick={() => handleTagClick("제거 가능한 태그")}
            >
              제거 가능한 태그
            </Tag>
            <Tag
              {...args}
              tone="warning"
              removable
              onClick={() => handleTagClick("클릭해보세요 (제거 안됨)")}
            >
              클릭해보세요 (제거 안됨)
            </Tag>
          </div>
          <p
            className={css({
              fontSize: "sm",
              color: "fg.neutral",
              marginTop: "8",
            })}
          >
            태그를 클릭하면 알림이 뜨고, X 버튼을 클릭하면 제거됩니다.
          </p>
        </div>
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
    removable: {
      control: false,
    },
    link: {
      control: false,
    },
  },
};
