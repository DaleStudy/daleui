import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "../../../styled-system/css";
import { hstack, vstack } from "../../../styled-system/patterns";
import { Tag } from "./Tag";
import type { TagProps } from "./Tag";
import type React from "react";
import { useState } from "react";
import { action } from "storybook/actions";

type StoryTagProps = {
  children: React.ReactNode;
  tone?: TagProps["tone"];
  href?: string;
  onRemove?: () => void;
  removable?: boolean;
};

export default {
  component: Tag,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1554-119",
    },
  },
  args: {
    children: "태그",
    tone: "neutral",
    href: undefined,
    removable: false,
  },
  argTypes: {
    children: {
      control: "text",
    },
    href: {
      control: "text",
      description: "링크 URL. 설정 시 `<a>` 태그로 렌더링됩니다.",
      type: { name: "string" },
    },
    removable: {
      control: "boolean",
      description:
        "활성화 시 `onRemove` 핸들러가 연결됩니다(가상 props입니다).",
    },
    onRemove: {
      control: false,
    },
  },
  render: ({ removable, ...args }) => (
    <Tag {...args} onRemove={removable ? action("remove") : undefined} />
  ),
} satisfies Meta<StoryTagProps>;

export const Basic: StoryObj<StoryTagProps> = {};

export const Tones: StoryObj<StoryTagProps> = {
  render: ({ removable, ...args }) => {
    const onRemove = removable ? action("remove") : undefined;
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={hstack({ gap: "8" })}>
          <Tag {...args} tone="neutral" onRemove={onRemove}>
            Neutral
          </Tag>
          <Tag {...args} tone="brand" onRemove={onRemove}>
            Brand
          </Tag>
          <Tag {...args} tone="danger" onRemove={onRemove}>
            Danger
          </Tag>
        </div>
        <div className={hstack({ gap: "8" })}>
          <Tag {...args} tone="warning" onRemove={onRemove}>
            Warning
          </Tag>
          <Tag {...args} tone="success" onRemove={onRemove}>
            Success
          </Tag>
          <Tag {...args} tone="info" onRemove={onRemove}>
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

export const Link: StoryObj<StoryTagProps> = {
  render: ({ removable, ...args }) => {
    const onRemove = removable ? action("remove") : undefined;
    return (
      <div className={vstack({ gap: "16" })}>
        <div className={hstack({ gap: "8" })}>
          <Tag {...args} onRemove={onRemove}>
            기본 태그
          </Tag>
          <Tag {...args} href="#" onRemove={onRemove}>
            링크 태그 (호버 해보세요)
          </Tag>
          <Tag
            {...args}
            href="https://example.com"
            target="_blank"
            onRemove={onRemove}
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
  },
};

export const Removable: StoryObj<typeof Tag> = {
  render: (args) => {
    const [tags, setTags] = useState([
      { id: 1, tone: "neutral", label: "제거 가능 태그" },
      { id: 2, tone: "success", label: "제거 가능 + 성공 톤" },
      { id: 3, tone: "danger", label: "제거 가능 + 위험 톤" },
    ]);

    const handleRemove = (id: number) => {
      setTags((prev) => prev.filter((tag) => tag.id !== id));
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
            제거 가능한 태그들 (X 버튼 클릭 시 제거됨)
          </h3>
          <div className={hstack({ gap: "8" })}>
            {tags.map((tag) => (
              <Tag
                key={tag.id}
                {...args}
                tone={tag.tone as any}
                onRemove={() => handleRemove(tag.id)}
              >
                {tag.label}
              </Tag>
            ))}
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
    onRemove: {
      control: false,
    },
  },
};
