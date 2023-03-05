import { createTheme } from "@mui/material/styles";

import PlayfairDisplay from "../fonts/PlayfairDisplay-Italic-VariableFont_wght.ttf";

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
  typography: {
    fontFamily: "Playfair Display, serif",
  },
});

export default theme;
