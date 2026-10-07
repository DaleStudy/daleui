import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "../Grid/Grid";
import { Text } from "../Text/Text";
import { Spinner, type SpinnerSize, type SpinnerTone } from "./Spinner";

const sizes: SpinnerSize[] = ["sm", "md"];
const tones: SpinnerTone[] = ["brand", "neutral"];

export default {
  component: Spinner,
  title: "Components/Spinner",
  parameters: {
    layout: "centered",
    // 회전 모션이 무한히 이어지므로 스냅샷을 결정적으로 유지하기 위해 모션을 멈춥니다.
    chromatic: { pauseAnimationAtEnd: true },
  },
  args: {
    size: "md",
    tone: "brand",
    label: "로딩 중",
  },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Grid gridTemplateColumns="repeat(2, auto)" gap="24" justifyItems="center">
      {sizes.map((size) => (
        <Text key={size} size="md" muted>
          {size}
        </Text>
      ))}
      {sizes.map((size) => (
        <Spinner key={size} {...args} size={size} />
      ))}
    </Grid>
  ),
  argTypes: {
    size: { control: false },
  },
};

export const Tones: Story = {
  render: (args) => (
    <Grid gridTemplateColumns="repeat(2, auto)" gap="24" justifyItems="center">
      {tones.map((tone) => (
        <Text key={tone} size="md" muted>
          {tone}
        </Text>
      ))}
      {tones.map((tone) => (
        <Spinner key={tone} {...args} tone={tone} />
      ))}
    </Grid>
  ),
  argTypes: {
    tone: { control: false },
  },
};
