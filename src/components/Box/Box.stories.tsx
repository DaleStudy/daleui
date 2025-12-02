import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "./Box";
import { css } from "../../../styled-system/css";
import { spacing } from "../../tokens/spacing";

const boxStyle = css({ bg: "bgSolid.brand", color: "fgSolid.brand" });

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
    className: boxStyle,
  },
} satisfies Meta<typeof Box>;

type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    width: 100,
    height: 100,
  },
};

export const Padding: Story = {
  render: () => (
    <div
      className={css({
        width: "300px",
        display: "flex",
        gap: "32",
        flexDirection: "column",
      })}
    >
      <div>
        <h4>padding: 16</h4>
        <Box padding="16" className={boxStyle}>
          Box 컴포넌트
        </Box>
      </div>

      <div>
        <h4>padding: 32</h4>
        <Box padding="32" className={boxStyle}>
          Box 컴포넌트
        </Box>
      </div>
    </div>
  ),
};

export const Margin: Story = {
  render: () => (
    <div
      className={css({
        width: "300px",
        display: "flex",
        gap: "16",
        flexDirection: "column",
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
          <Box margin="16" padding="8" className={boxStyle}>
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
          <Box margin="32" padding="8" className={boxStyle}>
            Box 컴포넌트
          </Box>
        </div>
      </div>
    </div>
  ),
};

export const Size: Story = {
  render: () => (
    <div
      className={css({ display: "flex", gap: "16", flexDirection: "column" })}
    >
      <div>
        <h4>100 x 100</h4>
        <Box width={100} height={100} className={boxStyle} />
      </div>
      <div>
        <h4>200 x 150</h4>
        <Box width={200} height={150} className={boxStyle} />
      </div>
    </div>
  ),
};

export const CardExample: Story = {
  render: () => (
    <div className={css({ display: "flex", gap: "16" })}>
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
    </div>
  ),
};
