import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { paletteDark, paletteLight } from "./palette";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme({
    colorSchemes: {
      light: { palette: { ...paletteLight } },
      dark: { palette: { ...paletteDark } },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    shape: { borderRadius: 8 },
  });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
