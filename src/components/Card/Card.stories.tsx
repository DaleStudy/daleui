import type { Meta, StoryObj } from "@storybook/react-vite";
import { vstack } from "../../../styled-system/patterns";
import { Card } from "./Card";

export default {
  component: Card,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/Dale-UI-Kit?node-id=1531-761",
    },
    docs: {
      description: {
        component: `
**Card** 컴포넌트는 아이콘, 제목, 설명을 포함한 카드 형태의 UI 요소입니다.

- **tone** 속성으로 카드의 색조를 지정할 수 있습니다. (\`neutral\`, \`brand\`)
- **outline** 속성을 사용하여 카드에 테두리를 추가할 수 있습니다.
- **link**, **linkText**, **isExternalLink** 속성을 함께 사용하여 링크 기능을 추가할 수 있습니다.
- **link**와 **linkText**가 모두 제공되면 카드 하단에 링크가 표시됩니다.
- **isExternalLink={true}**일 때는 새 탭에서 열리며, \`target="_blank"\`와 보안 속성이 자동으로 추가됩니다.
        `,
      },
    },
  },
  args: {
    title: "제목",
    description: "이 기능에 대한 설명을 여기에 작성합니다",
    icon: "star",
    tone: "neutral",
    outline: false,
  },
  argTypes: {
    title: {
      control: "text",
      description: "카드의 제목",
    },
    description: {
      control: "text",
      description: "카드의 설명",
    },
    icon: {
      control: "select",
      description: "카드에 표시될 아이콘",
    },
    tone: {
      control: "select",
      description: "카드의 색조",
      options: ["neutral", "brand"],
    },
    outline: {
      control: "boolean",
      description: "카드 테두리 표시 여부",
    },
    link: {
      control: "text",
      description: "링크 URL (선택사항)",
    },
    linkText: {
      control: "text",
      description: "링크 텍스트 (link가 있을 때 필수)",
    },
    isExternalLink: {
      control: "boolean",
      description: "외부 링크 여부",
    },
  },
} satisfies Meta<typeof Card>;

export const Basic: StoryObj<typeof Card> = {
  parameters: {
    docs: {
      description: {
        story:
          "기본적인 Card 컴포넌트입니다. 제목, 설명, 아이콘으로 구성되며, 링크 없이 정보만 표시합니다.",
      },
    },
  },
};

export const Tones: StoryObj<typeof Card> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Card
          {...args}
          tone="neutral"
          title="neutral"
          description="neutral 색조를 사용한 카드입니다."
          outline={true}
        />
        <Card
          {...args}
          tone="brand"
          title="brand"
          description="brand 색조를 사용한 카드입니다."
          outline={true}
        />
      </div>
    );
  },
  argTypes: {
    tone: {
      control: false,
    },
    title: {
      control: false,
    },
    description: {
      control: false,
    },
    outline: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: "**tone** 속성으로 카드의 색조를 변경할 수 있습니다.",
      },
    },
  },
};

export const Outlines: StoryObj<typeof Card> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Card
          {...args}
          title="테두리 없는 카드"
          description="기본적으로 테두리가 없는 Card입니다."
          outline={false}
        />
        <Card
          {...args}
          title="테두리 있는 카드"
          description="테두리가 있는 Card입니다."
          outline={true}
        />
      </div>
    );
  },
  argTypes: {
    outline: {
      control: false,
    },
    title: {
      control: false,
    },
    description: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "**outline** 속성으로 카드의 테두리 표시 여부를 설정할 수 있습니다. `true`로 설정하면 tone에 따른 색상의 테두리가 표시됩니다.",
      },
    },
  },
};

export const WithLink: StoryObj<typeof Card> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Card
          {...args}
          title="링크 없는 카드"
          description="링크가 없는 기본 Card입니다."
          icon="info"
        />
        <Card
          {...args}
          title="링크 있는 카드"
          description="링크가 포함된 Card입니다."
          icon="externalLink"
          link="#"
          linkText="자세히 보기"
        />
      </div>
    );
  },
  argTypes: {
    title: {
      control: false,
    },
    description: {
      control: false,
    },
    icon: {
      control: false,
    },
    link: {
      control: false,
    },
    linkText: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "**link**와 **linkText** 속성을 함께 제공하면 카드 하단에 링크가 표시됩니다. 링크는 카드의 tone에 맞는 색상으로 표시되며, external 아이콘이 자동으로 포함됩니다.",
      },
    },
  },
};

export const External: StoryObj<typeof Card> = {
  render: (args) => {
    return (
      <div className={vstack({ gap: "24" })}>
        <Card
          {...args}
          title="내부 링크 카드"
          description="같은 사이트 내의 다른 페이지로 이동하는 링크입니다."
          icon="messageCircle"
          link="/internal-page"
          linkText="페이지로 이동"
          isExternalLink={false}
        />
        <Card
          {...args}
          title="외부 링크 카드"
          description="외부 사이트로 이동하는 링크입니다. 새 탭에서 열립니다."
          icon="externalLink"
          link="https://www.example.com"
          linkText="외부 사이트 방문"
          isExternalLink={true}
        />
      </div>
    );
  },
  argTypes: {
    title: {
      control: false,
    },
    description: {
      control: false,
    },
    icon: {
      control: false,
    },
    link: {
      control: false,
    },
    linkText: {
      control: false,
    },
    isExternalLink: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "**isExternalLink** 속성으로 외부 링크 여부를 설정할 수 있습니다. `true`로 설정하면 내부 Link 컴포넌트의 `external` 속성이 활성화되어 새 탭에서 열립니다.",
      },
    },
  },
};
