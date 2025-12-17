import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";
import { Flex } from "../Flex/Flex";
import { VStack } from "../VStack/VStack";
import { css } from "../../../styled-system/css";
import { spacing } from "../../tokens/spacing";

export default {
  component: Box,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: false },
    padding: {
      options: Object.keys(spacing as Record<string, unknown>),
    },
    margin: {
      options: Object.keys(spacing as Record<string, unknown>),
    },
    className: { control: false },
  },
  args: {
    className: css({ bg: "bgSolid.brand", color: "fgSolid.brand" }),
  },
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    width: "100px",
    height: "100px",
  },
};

export const Padding: Story = {
  render: (args) => (
    <VStack
      gap="32"
      className={css({
        width: "300px",
      })}
    >
      <div>
        <h4>padding: 16</h4>
        <Box {...args} padding="16">
          Box 컴포넌트
        </Box>
      </div>

      <div>
        <h4>padding: 32</h4>
        <Box {...args} padding="32">
          Box 컴포넌트
        </Box>
      </div>
    </VStack>
  ),
};

export const Margin: Story = {
  render: (args) => (
    <VStack
      gap="16"
      className={css({
        width: "300px",
      })}
    >
      <div>
        <h4>margin: 16</h4>
        <div
          className={css({
            border: "1px solid gray",
            padding: "4",
          })}
        >
          <Box {...args} margin="16" padding="8">
            Box 컴포넌트
          </Box>
        </div>
      </div>
      <div>
        <h4>margin: 32</h4>
        <div
          className={css({
            border: "1px solid gray",
            padding: "4",
          })}
        >
          <Box {...args} margin="32" padding="8">
            Box 컴포넌트
          </Box>
        </div>
      </div>
    </VStack>
  ),
};

export const Size: Story = {
  render: (args) => (
    <VStack gap="16">
      <div>
        <h4>100px x 100px</h4>
        <Box {...args} width="100px" height="100px" />
      </div>
      <div>
        <h4>10rem x 5rem</h4>
        <Box {...args} width="10rem" height="5rem" />
      </div>
      <div>
        <h4>50% x 100px</h4>
        <div className={css({ width: "300px" })}>
          <Box {...args} width="100%" height="100px" />
        </div>
      </div>
    </VStack>
  ),
};

export const CardExample: Story = {
  render: () => (
    <Flex gap="16">
      <Box
        padding="24"
        className={css({
          bg: "bg.neutral.subtle",
          borderRadius: "lg",
          border: "1px solid",
          borderColor: "border.neutral",
        })}
      >
        <h3 className={css({ textStyle: "label.lg", mb: "8" })}>
          카드 컴포넌트
        </h3>
        <p className={css({ textStyle: "body.sm", color: "fg.neutral" })}>
          카드 형태의 박스로 활용할 수 있습니다.
        </p>
      </Box>
    </Flex>
  ),
};
