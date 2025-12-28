import type { Meta, StoryObj } from "@storybook/react-vite";
import { Team } from "./Team";

const meta = {
  title: "Marketing/Team",
  component: Team,
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        inline: false,
        iframeHeight: 900,
      },
    },
  },
} satisfies Meta<typeof Team>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
