import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "../Grid/Grid";
import { HStack } from "../HStack/HStack";
import { Text } from "../Text/Text";
import { VStack } from "../VStack/VStack";
import { Avatar, type AvatarSize } from "./Avatar";

const sizes: AvatarSize[] = ["sm", "md", "lg"];

const sampleImage = "https://avatars.githubusercontent.com/u/5466341?v=4&s=100";

export default {
  component: Avatar,
  title: "Components/Avatar",
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/mQ2ETYC6LXGOwVETov3CgO/DaleUI-Kit?node-id=9560-215",
    },
  },
  args: {
    src: "",
    name: "서달레",
    size: "md",
  },
  argTypes: {
    src: { control: "text" },
    name: { control: "text" },
    size: { control: "inline-radio", options: sizes },
  },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

export const Basic: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Grid gridTemplateColumns="repeat(3, auto)" gap="24" justifyItems="start">
      <Text size="md" muted>
        image
      </Text>
      <Text size="md" muted>
        initial
      </Text>
      <Text size="md" muted>
        fallback
      </Text>
      <Avatar {...args} src={sampleImage} />
      <Avatar {...args} src="" />
      <Avatar {...args} src="" name={undefined} />
    </Grid>
  ),
  argTypes: {
    src: { control: false },
  },
};

export const Sizes: Story = {
  render: (args) => (
    <HStack gap="24" align="bottom">
      {sizes.map((size) => (
        <VStack key={size} gap="8" align="left">
          <Text size="md" muted>
            {size}
          </Text>
          <Avatar {...args} size={size} />
        </VStack>
      ))}
    </HStack>
  ),
  argTypes: {
    size: { control: false },
  },
};

export const Initials: Story = {
  args: {
    size: "lg",
  },
  render: (args) => (
    <HStack gap="24" align="top">
      {[
        { name: "서달레", note: "한글 → 첫 글자" },
        { name: "Dale Seo", note: "영문 두 단어 → 각 첫 글자" },
        { name: "dale", note: "영문 한 단어 → 앞 두 글자" },
        { name: "山田太郎", note: "한자 → 첫 글자" },
      ].map(({ name, note }) => (
        <VStack key={name} gap="8" align="left">
          <Text size="md" muted>
            {note}
          </Text>
          <HStack gap="8">
            <Avatar {...args} src="" name={name} />
            <Text size="md">{name}</Text>
          </HStack>
        </VStack>
      ))}
    </HStack>
  ),
  argTypes: {
    src: { control: false },
    name: { control: false },
  },
};
