import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid } from "./Grid";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";

const Item = ({
  children,
  color = "brand",
}: {
  children: React.ReactNode;
  color?: "brand" | "secondary" | "tertiary";
}) => {
  const bgColors = {
    brand: "bgSolid.brand",
    secondary: "bgSolid.secondary",
    tertiary: "bgSolid.tertiary",
  } as const;
  const fgColors = {
    brand: "fgSolid.brand",
    secondary: "fgSolid.secondary",
    tertiary: "fgSolid.tertiary",
  } as const;

  return (
    <div
      className={css({
        padding: "16",
        backgroundColor: bgColors[color],
        color: fgColors[color],
        borderRadius: "md",
        textAlign: "center",
      })}
    >
      {children}
    </div>
  );
};

export default {
  component: Grid,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: false },
    gridTemplateColumns: {
      control: "text",
      description:
        "열 템플릿 (예: 'repeat(3, 1fr)', '1fr 2fr 1fr', '100px auto 1fr')",
    },
    gridTemplateRows: {
      control: "text",
      description: "행 템플릿 (예: 'repeat(2, 100px)', 'auto 1fr auto')",
    },
    gap: {
      control: "select",
      options: [undefined, ...Object.keys(spacing || {})],
      description: "요소 간 간격",
    },
    autoFlow: {
      description: "grid-auto-flow 설정",
    },
    justifyItems: {
      description: "그리드 아이템의 인라인 축 정렬",
    },
    alignItems: {
      description: "그리드 아이템의 블록 축 정렬",
    },
    justifyContent: {
      description: "그리드 컨테이너의 인라인 축 정렬",
    },
    alignContent: {
      description: "그리드 컨테이너의 블록 축 정렬",
    },
    areas: { control: false },
    className: { control: false },
  },
  args: {
    as: "div",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "",
    gap: "8",
    className: css({ width: "600" }),
    children: (
      <>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
        <Item>5</Item>
        <Item>6</Item>
        <Item>7</Item>
        <Item>8</Item>
        <Item>9</Item>
        <Item>10</Item>
        <Item>11</Item>
        <Item>12</Item>
      </>
    ),
  },
} satisfies Meta<typeof Grid>;

type Story = StoryObj<typeof Grid>;

export const Default: Story = {};

export const Templates: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "1fr", gap: "24" })}>
      <div>
        <h4 className={css({ marginBottom: "8" })}>균등 3열 (repeat)</h4>
        <Grid {...args} gridTemplateColumns="repeat(3, 1fr)" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>비율 레이아웃 (1:2:1)</h4>
        <Grid {...args} gridTemplateColumns="1fr 2fr 1fr" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>고정 + 유동</h4>
        <Grid {...args} gridTemplateColumns="100px auto 100px" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>minmax 사용</h4>
        <Grid {...args} gridTemplateColumns="repeat(3, minmax(80px, 1fr))" />
      </div>
    </div>
  ),
  argTypes: {
    gridTemplateColumns: { control: false },
  },
  args: {
    className: css({ width: "500" }),
    children: (
      <>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </>
    ),
  },
};

export const Gaps: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "1fr", gap: "16" })}>
      <div>
        <h4>간격 4</h4>
        <Grid {...args} gap="4" />
      </div>
      <div>
        <h4>간격 8</h4>
        <Grid {...args} gap="8" />
      </div>
      <div>
        <h4>간격 16</h4>
        <Grid {...args} gap="16" />
      </div>
    </div>
  ),
  argTypes: {
    gap: { control: false },
  },
};

export const GridItemSpan: Story = {
  render: (args) => (
    <Grid
      {...args}
      gridTemplateColumns="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400" })}
    >
      <div className={css({ gridColumn: "span 2" })}>
        <Item color="brand">gridColumn: span 2</Item>
      </div>
      <div>
        <Item color="secondary">1</Item>
      </div>
      <div>
        <Item color="secondary">2</Item>
      </div>
      <div className={css({ gridRow: "span 2" })}>
        <Item color="tertiary">gridRow: span 2</Item>
      </div>
      <div>
        <Item color="secondary">3</Item>
      </div>
      <div>
        <Item color="secondary">4</Item>
      </div>
      <div>
        <Item color="secondary">5</Item>
      </div>
    </Grid>
  ),
  args: {
    children: undefined,
  },
};

export const GridItemPosition: Story = {
  render: (args) => (
    <Grid
      {...args}
      gridTemplateColumns="repeat(4, 1fr)"
      gridTemplateRows="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400", height: "300" })}
    >
      <div
        className={css({
          gridColumnStart: "1",
          gridColumnEnd: "3",
          gridRowStart: "1",
          gridRowEnd: "2",
        })}
      >
        <Item color="brand">gridColumnStart: 1, gridColumnEnd: 3</Item>
      </div>
      <div
        className={css({
          gridColumnStart: "3",
          gridColumnEnd: "5",
          gridRowStart: "1",
          gridRowEnd: "3",
        })}
      >
        <Item color="secondary">
          gridColumnStart: 3, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 3
        </Item>
      </div>
      <div
        className={css({
          gridColumnStart: "1",
          gridColumnEnd: "3",
          gridRowStart: "2",
          gridRowEnd: "4",
        })}
      >
        <Item color="tertiary">
          gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 2, gridRowEnd: 4
        </Item>
      </div>
    </Grid>
  ),
  args: {
    children: undefined,
  },
};

export const AreasWithArray: Story = {
  render: (args) => (
    <Grid
      {...args}
      areas={[
        ["header", "header", "header"],
        ["sidebar", "main", "main"],
        ["footer", "footer", "footer"],
      ]}
      gridTemplateColumns="repeat(3, 1fr)"
      gridTemplateRows="repeat(3, 1fr)"
      gap="8"
      className={css({ width: "400", height: "300" })}
    >
      <div className={css({ gridArea: "header" })}>
        <Item color="brand">Header</Item>
      </div>
      <div className={css({ gridArea: "sidebar" })}>
        <Item color="secondary">Sidebar</Item>
      </div>
      <div className={css({ gridArea: "main" })}>
        <Item color="tertiary">Main</Item>
      </div>
      <div className={css({ gridArea: "footer" })}>
        <Item color="brand">Footer</Item>
      </div>
    </Grid>
  ),
  args: {
    children: undefined,
  },
};

export const JustifyItems: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "1fr", gap: "24" })}>
      <div>
        <h4 className={css({ marginBottom: "8" })}>start (왼쪽 정렬)</h4>
        <Grid {...args} justifyItems="start" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>center (중앙 정렬)</h4>
        <Grid {...args} justifyItems="center" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>end (오른쪽 정렬)</h4>
        <Grid {...args} justifyItems="end" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>
          stretch (기본값, 셀 전체 너비)
        </h4>
        <Grid {...args} justifyItems="stretch" />
      </div>
    </div>
  ),
  argTypes: {
    justifyItems: { control: false },
  },
  args: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8",
    className: css({ width: "400" }),
    children: (
      <>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </>
    ),
  },
};

export const AlignItems: Story = {
  render: (args) => (
    <div className={grid({ gridTemplateColumns: "repeat(4, 1fr)", gap: "24" })}>
      <div>
        <h4 className={css({ marginBottom: "8" })}>start (상단)</h4>
        <Grid {...args} alignItems="start" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>center (중앙)</h4>
        <Grid {...args} alignItems="center" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>end (하단)</h4>
        <Grid {...args} alignItems="end" />
      </div>
      <div>
        <h4 className={css({ marginBottom: "8" })}>stretch (전체)</h4>
        <Grid {...args} alignItems="stretch" />
      </div>
    </div>
  ),
  argTypes: {
    alignItems: { control: false },
  },
  args: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "1fr",
    gap: "8",
    className: css({ width: "300", height: "120" }),
    children: (
      <>
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
      </>
    ),
  },
};
