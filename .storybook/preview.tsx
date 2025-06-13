import "../src/index.css";
import React from "react";
import { withThemeByClassName } from "@storybook/addon-themes";
import { DocsContainer } from "@storybook/blocks";
import { themes } from "@storybook/theming";
import type { Preview, ReactRenderer } from "@storybook/react";
import type { DocsContainerProps } from "@storybook/blocks";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      container: (props: DocsContainerProps<ReactRenderer>) => {
        try {
          const { getStoryContext, storyById } = props.context;

          const globals = getStoryContext(storyById()).globals;
          const theme = globals.theme === "dark" ? themes.dark : themes.light;
          return <DocsContainer {...props} theme={theme} />;
        } catch {
          return <DocsContainer {...props} />;
        }
      },
    },
    backgrounds: {
      values: [
        { name: "light", value: "#FCFCFD" },
        { name: "dark", value: "#101211" },
      ],
      default: "light",
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  tags: ["autodocs"],
};

export default preview;
