import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B8E7D",
    },
    secondary: {
      main: "#292F36",
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
