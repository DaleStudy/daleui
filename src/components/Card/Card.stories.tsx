import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";
import type { IconName } from "../../tokens/iconography";
import type { Tone } from "../../tokens/colors";
interface CardStoryArgs {
  tone: Extract<Tone, "neutral" | "brand">;
  outline: boolean;
  iconName: IconName;
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  linkExternal: boolean;
}

export default {
  title: "Components/Card",
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

컴파운드 컴포넌트 패턴을 사용하여 구성됩니다:
- \`Card\`: 카드 컨테이너 (tone, outline 설정)
- \`Card.Icon\`: 아이콘 (Root 바로 아래 배치)
- \`Card.Body\`: 제목과 설명을 감싸는 컨테이너
- \`Card.Title\`: 제목
- \`Card.Description\`: 설명
- \`Card.Link\`: 링크 (선택사항, href와 external 속성 지원)

**tone** 속성은 Root에서 설정하며, Icon과 Link에 자동으로 전달됩니다.
**outline** 속성을 사용하여 카드에 테두리를 추가할 수 있습니다.
        `,
      },
    },
  },
  args: {
    tone: "neutral",
    outline: false,
    iconName: "star",
    title: "제목",
    description: "이 기능에 대한 설명을 여기에 작성합니다",
    linkHref: "",
    linkText: "",
    linkExternal: false,
  },
  argTypes: {
    tone: {
      control: "radio",
      options: ["neutral", "brand"],
      description: "카드의 색조",
    },
    outline: {
      description: "테두리 표시 여부",
    },
    iconName: {
      control: "select",
      options: [
        "star",
        "info",
        "circleAlert",
        "check",
        "externalLink",
        "messageCircle",
        "handHeart",
        "heartHandshake",
        "thumbsUp",
        "user",
        "award",
        "globe",
        "search",
      ],
      description: "아이콘 이름",
    },
    title: {
      description: "카드 제목",
    },
    description: {
      description: "카드 설명",
    },
    linkHref: {
      description: "링크 URL (비어있으면 링크 미표시)",
    },
    linkText: {
      description: "링크 텍스트",
    },
    linkExternal: {
      description: "외부 링크 여부",
    },
  },
  render: (args) => (
    <Card tone={args.tone} outline={args.outline}>
      <Card.Icon name={args.iconName} />
      <Card.Body>
        <Card.Title>{args.title}</Card.Title>
        <Card.Description>{args.description}</Card.Description>
      </Card.Body>
      {args.linkHref && (
        <Card.Link href={args.linkHref} external={args.linkExternal}>
          {args.linkText}
        </Card.Link>
      )}
    </Card>
  ),
} satisfies Meta<CardStoryArgs>;

export const Basic: StoryObj<CardStoryArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          "기본적인 Card 컴포넌트입니다. Controls 패널에서 모든 속성을 조정하여 테스트할 수 있습니다.",
      },
    },
  },
};

export const WithBrand: StoryObj<CardStoryArgs> = {
  args: {
    tone: "brand",
    outline: true,
    title: "브랜드 색조",
    description: "brand 색조를 사용한 카드입니다.",
  },
  parameters: {
    docs: {
      description: {
        story: "**tone** 속성으로 카드의 색조를 변경할 수 있습니다.",
      },
    },
  },
};

export const WithOutline: StoryObj<CardStoryArgs> = {
  args: {
    outline: true,
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

export const WithLink: StoryObj<CardStoryArgs> = {
  args: {
    iconName: "info",
    title: "링크 있는 카드",
    description: "링크가 포함된 Card입니다.",
    linkHref: "#",
    linkText: "자세히 보기",
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Card.Link**를 사용하여 카드 하단에 링크를 추가할 수 있습니다. 링크는 자동으로 Card의 tone을 따릅니다.",
      },
    },
  },
};

export const WithExternalLink: StoryObj<CardStoryArgs> = {
  args: {
    iconName: "externalLink",
    title: "외부 링크 카드",
    description: "외부 사이트로 이동하는 링크입니다. 새 탭에서 열립니다.",
    linkHref: "https://www.example.com",
    linkText: "외부 사이트 방문",
    linkExternal: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Card.Link**의 **external** 속성으로 외부 링크 여부를 설정할 수 있습니다. `true`로 설정하면 새 탭에서 열리며 아이콘이 자동으로 추가됩니다.",
      },
    },
  },
};
