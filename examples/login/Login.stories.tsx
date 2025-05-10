import type { StoryObj } from "@storybook/react";
import { Login } from "./Login";

export default {
  component: Login,
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      // TODO: 추후 실제 figma에 로그인 디자인이 나오면 변경 예정
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/NoName-Design-System?node-id=11-343",
    },
  },
  args: {},
};

export const Basic: StoryObj<typeof Login> = {};
