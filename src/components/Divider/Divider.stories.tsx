import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "../../../styled-system/css";
import { hstack, vstack } from "../../../styled-system/patterns";
import { Text } from "../Text/Text";
import { Divider } from "./Divider";

export default {
  component: Divider,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/DaleUI-Kit?node-id=9346-128&t=U9pxZQB7bzamQwER-1",
    },
  },
  args: {
    orientation: "horizontal",
    variant: "solid",
    stroke: "sm",
  },
} satisfies Meta<typeof Divider>;

export const Basic: StoryObj<typeof Divider> = {
  render: (args) => (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "240px",
        height: "80px",
      })}
    >
      <Divider {...args} />
    </div>
  ),
};

export const Orientations: StoryObj<typeof Divider> = {
  render: () => (
    <div className={vstack({ gap: "24", alignItems: "flex-start" })}>
      <div className={vstack({ gap: "8", alignItems: "flex-start" })}>
        <Text size="sm" muted>
          horizontal (기본값)
        </Text>
        <div className={css({ width: "240px" })}>
          <Divider orientation="horizontal" />
        </div>
      </div>
      <div className={vstack({ gap: "8", alignItems: "flex-start" })}>
        <Text size="sm" muted>
          vertical
        </Text>
        <div className={hstack({ gap: "8", height: "80px" })}>
          <span>왼쪽</span>
          <Divider orientation="vertical" />
          <span>오른쪽</span>
        </div>
      </div>
    </div>
  ),
  argTypes: {
    orientation: { control: false },
  },
};

export const Variants: StoryObj<typeof Divider> = {
  render: () => (
    <div
      className={vstack({
        gap: "24",
        alignItems: "flex-start",
        width: "240px",
      })}
    >
      <div
        className={vstack({
          gap: "8",
          alignItems: "flex-start",
          width: "100%",
        })}
      >
        <Text size="sm" muted>
          solid (기본값)
        </Text>
        <Divider variant="solid" />
      </div>
      <div
        className={vstack({
          gap: "8",
          alignItems: "flex-start",
          width: "100%",
        })}
      >
        <Text size="sm" muted>
          dashed
        </Text>
        <Divider variant="dashed" />
      </div>
    </div>
  ),
  argTypes: {
    variant: { control: false },
  },
};

export const Strokes: StoryObj<typeof Divider> = {
  render: () => (
    <div
      className={vstack({
        gap: "24",
        alignItems: "flex-start",
        width: "240px",
      })}
    >
      <div
        className={vstack({
          gap: "8",
          alignItems: "flex-start",
          width: "100%",
        })}
      >
        <Text size="sm" muted>
          sm · 1px (기본값)
        </Text>
        <Divider stroke="sm" />
      </div>
      <div
        className={vstack({
          gap: "8",
          alignItems: "flex-start",
          width: "100%",
        })}
      >
        <Text size="sm" muted>
          xs · 0.5px
        </Text>
        <Divider stroke="xs" />
      </div>
    </div>
  ),
  argTypes: {
    stroke: { control: false },
  },
};

export const ListUsage: StoryObj<typeof Divider> = {
  render: () => (
    <div className={vstack({ gap: "24", alignItems: "flex-start" })}>
      <div
        className={vstack({
          gap: "8",
          alignItems: "flex-start",
          width: "160px",
        })}
      >
        <span>리스트 아이템 1</span>
        <span>리스트 아이템 2</span>
        <span>리스트 아이템 3</span>
        <Divider />
        <span>리스트 아이템 A</span>
        <span>리스트 아이템 B</span>
      </div>
      <div className={hstack({ gap: "8", alignItems: "stretch" })}>
        <span>리스트 아이템 1</span>
        <span>리스트 아이템 2</span>
        <span>리스트 아이템 3</span>
        <Divider orientation="vertical" />
        <span>리스트 아이템 A</span>
        <span>리스트 아이템 B</span>
      </div>
    </div>
  ),
  argTypes: {
    orientation: { control: false },
    variant: { control: false },
    stroke: { control: false },
  },
};
