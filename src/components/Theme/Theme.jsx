import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8E7D",
    },
    secondary: {
      main: "#292F36",
    },
    warning: {
      main: "#C1666B",
    },
    dark: {
      main: "#000000",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
    MuiButtonGroup: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
});

export default theme;
