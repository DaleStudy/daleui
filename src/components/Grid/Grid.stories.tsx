import type { Meta, StoryObj } from "@storybook/react-vite";
import { Grid, GridItem } from "./Grid";
import { css } from "../../../styled-system/css";
import { grid } from "../../../styled-system/patterns";
import { spacing } from "../../tokens/spacing";

const itemBox = {
  brand: css({
    padding: "16",
    backgroundColor: "bgSolid.brand",
    color: "fgSolid.brand",
    borderRadius: "md",
    textAlign: "center",
  }),
  secondary: css({
    padding: "16",
    backgroundColor: "bgSolid.neutral",
    color: "fgSolid.neutral",
    borderRadius: "md",
    textAlign: "center",
  }),
  tertiary: css({
    padding: "16",
    backgroundColor: "bgSolid.danger",
    color: "fgSolid.danger",
    borderRadius: "md",
    textAlign: "center",
  }),
} as const;

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
        <GridItem className={itemBox.brand}>1</GridItem>
        <GridItem className={itemBox.brand}>2</GridItem>
        <GridItem className={itemBox.brand}>3</GridItem>
        <GridItem className={itemBox.brand}>4</GridItem>
        <GridItem className={itemBox.brand}>5</GridItem>
        <GridItem className={itemBox.brand}>6</GridItem>
        <GridItem className={itemBox.brand}>7</GridItem>
        <GridItem className={itemBox.brand}>8</GridItem>
        <GridItem className={itemBox.brand}>9</GridItem>
        <GridItem className={itemBox.brand}>10</GridItem>
        <GridItem className={itemBox.brand}>11</GridItem>
        <GridItem className={itemBox.brand}>12</GridItem>
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
        <GridItem className={itemBox.brand}>1</GridItem>
        <GridItem className={itemBox.brand}>2</GridItem>
        <GridItem className={itemBox.brand}>3</GridItem>
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
      <GridItem gridColumn="span 2" className={itemBox.brand}>
        gridColumn: span 2
      </GridItem>
      <GridItem className={itemBox.brand}>1</GridItem>
      <GridItem className={itemBox.brand}>2</GridItem>
      <GridItem gridRow="span 2" className={itemBox.brand}>
        gridRow: span 2
      </GridItem>
      <GridItem className={itemBox.brand}>3</GridItem>
      <GridItem className={itemBox.brand}>4</GridItem>
      <GridItem className={itemBox.brand}>5</GridItem>
    </Grid>
  ),
  args: {
    children: undefined,
  },
};

export const GridItemPosition: Story = {
  render: (args) => (
    <Grid {...args} gap="8" className={css({ width: "400", height: "300" })}>
      <GridItem
        gridColumnStart="1"
        gridColumnEnd="3"
        gridRowStart="1"
        gridRowEnd="2"
        className={itemBox.brand}
      >
        gridColumnStart: 1, gridColumnEnd: 3
      </GridItem>
      <GridItem
        gridColumnStart="3"
        gridColumnEnd="5"
        gridRowStart="1"
        gridRowEnd="3"
        className={itemBox.secondary}
      >
        gridColumnStart: 3, gridColumnEnd: 5, gridRowStart: 1, gridRowEnd: 3
      </GridItem>
      <GridItem
        gridColumnStart="1"
        gridColumnEnd="3"
        gridRowStart="3"
        gridRowEnd="4"
        className={itemBox.tertiary}
      >
        gridColumnStart: 1, gridColumnEnd: 3, gridRowStart: 3, gridRowEnd: 4
      </GridItem>
    </Grid>
  ),
  args: {
    children: undefined,
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(3, 1fr)",
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
      <GridItem gridArea="header" className={itemBox.brand}>
        Header
      </GridItem>
      <GridItem gridArea="sidebar" className={itemBox.secondary}>
        Sidebar
      </GridItem>
      <GridItem gridArea="main" className={itemBox.tertiary}>
        Main
      </GridItem>
      <GridItem gridArea="footer" className={itemBox.brand}>
        Footer
      </GridItem>
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
        <GridItem className={itemBox.brand}>1</GridItem>
        <GridItem className={itemBox.brand}>2</GridItem>
        <GridItem className={itemBox.brand}>3</GridItem>
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
        <GridItem className={itemBox.brand}>1</GridItem>
        <GridItem className={itemBox.brand}>2</GridItem>
        <GridItem className={itemBox.brand}>3</GridItem>
      </>
    ),
  },
};
