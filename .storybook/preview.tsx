import "../src/index.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { themes } from "storybook/theming";
import type { Preview, ReactRenderer } from "@storybook/react-vite";
import type { DocsContainerProps } from "@storybook/addon-docs/blocks";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      options: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "320px",
            height: "568px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "640px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1024px",
            height: "800px",
          },
        },
        largeDesktop: {
          name: "Large Desktop",
          styles: {
            width: "1280px",
            height: "1024px",
          },
        },
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
