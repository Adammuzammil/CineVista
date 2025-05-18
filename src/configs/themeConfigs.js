import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#C7253E",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "rgba(255, 255, 255, 0.4)",
            },
          }
        : {
            primary: {
              main: "#ff0000",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      typography: { fontFamily: ["Yellowtail", "cursive"].join(",") },
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
