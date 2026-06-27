import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { css } from "../../../styled-system/css";
import { Button } from "../Button/Button";
import { Skeleton } from "./Skeleton";
import type { SkeletonAnimation, SkeletonVariant } from "./Skeleton";

interface SkeletonStoryArgs {
  variant: SkeletonVariant;
  animation: SkeletonAnimation;
  width: string | number;
  height: string | number;
}

const animations: SkeletonAnimation[] = ["pulse", "wave", false];

const row = css({ display: "flex", gap: "24", alignItems: "center" });
const col = css({ display: "flex", flexDirection: "column", gap: "16" });
const cell = css({ display: "flex", flexDirection: "column", gap: "8" });
const label = css({
  fontSize: "sm",
  color: "fg.neutral",
  fontFamily: "mono",
});

export default {
  title: "Components/Skeleton",
  parameters: {
    layout: "centered",
    // 애니메이션이 포함된 스토리의 스냅샷을 결정적으로 유지하기 위해 모션을 끝에서 멈춥니다.
    chromatic: { pauseAnimationAtEnd: true },
    docs: {
      description: {
        component: `
콘텐츠가 로딩되는 동안 자리를 표시하는 플레이스홀더(스켈레톤) 컴포넌트입니다.

- **variant**: \`text\`(기본) · \`circular\` · \`rectangular\` · \`rounded\`
- **animation**: \`pulse\` · \`wave\`(중성 회색), \`false\`(정적)
- **loading**: \`false\`로 두면 실제 \`children\`이 렌더링됩니다. 자식을 전달하면 그 크기에 맞춰 레이아웃을 예약합니다.

컴파운드 컴포넌트로 구성됩니다:
- \`Skeleton\`: 기본 플레이스홀더 (variant, animation, width/height, loading)
- \`Skeleton.Text\`: 여러 줄 텍스트 플레이스홀더 (lines, lastLineWidth)
- \`Skeleton.Avatar\`: 원형 아바타 플레이스홀더 (size)

### 접근성 및 모션 안내
- 플레이스홀더는 \`aria-hidden\`으로 가려지고, 래퍼는 \`aria-busy\`로 로딩 상태를 알립니다.
- 모든 애니메이션은 \`prefers-reduced-motion: reduce\` 환경에서 자동으로 정적 채움으로 대체됩니다.
        `,
      },
    },
  },
  args: {
    variant: "text",
    animation: "pulse",
    width: "200px",
    height: "",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["text", "circular", "rectangular", "rounded"],
      description: "모양",
    },
    animation: {
      control: "select",
      options: animations,
      description: "모션",
    },
    width: { control: "text", description: "너비 (숫자는 px)" },
    height: { control: "text", description: "높이 (숫자는 px)" },
  },
  render: (args) => (
    <Skeleton
      variant={args.variant}
      animation={args.animation}
      width={args.width || undefined}
      height={args.height || undefined}
    />
  ),
} satisfies Meta<SkeletonStoryArgs>;

export const Basic: StoryObj<SkeletonStoryArgs> = {
  parameters: {
    docs: {
      description: {
        story:
          "Controls 패널에서 variant, animation, width, height를 조정하여 테스트할 수 있습니다.",
      },
    },
  },
};

export const Variants: StoryObj<SkeletonStoryArgs> = {
  render: () => (
    <div className={row}>
      <div className={cell}>
        <span className={label}>text</span>
        <Skeleton variant="text" width="160px" />
      </div>
      <div className={cell}>
        <span className={label}>circular</span>
        <Skeleton variant="circular" width={56} height={56} />
      </div>
      <div className={cell}>
        <span className={label}>rectangular</span>
        <Skeleton variant="rectangular" width={120} height={56} />
      </div>
      <div className={cell}>
        <span className={label}>rounded</span>
        <Skeleton variant="rounded" width={120} height={56} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "네 가지 모양 변형입니다. `rectangular`는 직각 모서리(MUI 패리티), `rounded`는 `md` 반경, `text`는 둘러싼 글자 크기에 맞춰 높이가 자동 조절됩니다.",
      },
    },
  },
};

export const Animations: StoryObj<SkeletonStoryArgs> = {
  render: () => (
    <div className={col}>
      {animations.map((animation) => (
        <div key={String(animation)} className={cell}>
          <span className={label}>{String(animation)}</span>
          <Skeleton
            variant="rounded"
            animation={animation}
            width={240}
            height={40}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "`pulse`/`wave`는 중성 회색 모션이고, `false`는 정적 채움입니다.",
      },
    },
  },
};

export const Text: StoryObj<SkeletonStoryArgs> = {
  render: () => (
    <div className={css({ width: "320px" })}>
      <Skeleton.Text lines={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "여러 줄 텍스트 플레이스홀더입니다. 마지막 줄은 문단처럼 보이도록 좁아집니다(`lastLineWidth` 기본 60%).",
      },
    },
  },
};

export const Avatar: StoryObj<SkeletonStoryArgs> = {
  render: () => (
    <div className={row}>
      <Skeleton.Avatar size={32} />
      <Skeleton.Avatar size={48} />
      <Skeleton.Avatar size={64} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "원형 아바타 플레이스홀더입니다. `size`로 지름을 지정합니다.",
      },
    },
  },
};

export const MediaObject: StoryObj<SkeletonStoryArgs> = {
  render: () => (
    <div className={css({ display: "flex", gap: "16", width: "320px" })}>
      <Skeleton.Avatar size={48} />
      <div className={css({ flex: "1" })}>
        <Skeleton.Text lines={3} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "아바타와 텍스트를 조합한 전형적인 카드/댓글 로딩 자리표시 예시입니다.",
      },
    },
  },
};

function LoadingToggleDemo() {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: "16",
        width: "320px",
      })}
    >
      <Button onClick={() => setLoading((value) => !value)}>
        {loading ? "콘텐츠 보이기" : "다시 로딩"}
      </Button>
      <div className={css({ display: "flex", gap: "16" })}>
        <Skeleton.Avatar size={48} loading={loading}>
          <img
            src="https://avatars.githubusercontent.com/u/52685259"
            alt="DaleStudy"
            width={48}
            height={48}
            className={css({ borderRadius: "full" })}
          />
        </Skeleton.Avatar>
        <div className={css({ flex: "1" })}>
          <Skeleton.Text lines={3} loading={loading}>
            <p>
              실제 콘텐츠가 여기에 표시됩니다. 로딩이 끝나면 스켈레톤이 실제
              콘텐츠로 교체됩니다.
            </p>
          </Skeleton.Text>
        </div>
      </div>
    </div>
  );
}

export const LoadingToggle: StoryObj<SkeletonStoryArgs> = {
  render: () => <LoadingToggleDemo />,
  parameters: {
    // 인터랙션 데모이므로 Chromatic 스냅샷은 생략합니다.
    chromatic: { disableSnapshot: true },
    docs: {
      description: {
        story:
          "`loading`을 토글하면 플레이스홀더가 실제 콘텐츠로 교체됩니다. 자식을 전달했기 때문에 로딩 중에는 자식 크기에 맞춰 레이아웃이 예약됩니다.",
      },
    },
  },
};

export const ReducedMotion: StoryObj<SkeletonStoryArgs> = {
  render: () => (
    <div className={col}>
      <Skeleton variant="rounded" animation="pulse" width={280} height={40} />
      <Skeleton variant="rounded" animation="wave" width={280} height={40} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "운영체제에서 '동작 줄이기'(`prefers-reduced-motion: reduce`)를 켜면 모든 애니메이션이 멈추고 정적 채움으로 대체됩니다.",
      },
    },
  },
};
