import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: "gray.200",
            backgroundColor: "gray.50",
          },
          td: {
            borderColor: "gray.100",
          },
        },
      },
    },
  },
});

export default theme;
