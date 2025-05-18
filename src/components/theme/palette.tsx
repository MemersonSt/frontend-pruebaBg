import { alpha, type PaletteOptions } from "@mui/material/styles";

// SETUP COLORS
const PRIMARY = {
  lighter: "#273648",
  light: "#2F4156",
  main: "#E91E63",
  dark: "#D81B60",
  darker: "#273648",
  contrastText: "#2F4156",
};
const SECONDARY = {
  lighter: "#F5EFEB",
  light: "#F5EFEB",
  main: "#F5EFEB",
  dark: "#F5EFEB",
  darker: "#2F4156",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#1890FF",
  dark: "#0C53B7",
  darker: "#04297A",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
};
const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
};
const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#212B36",
  900: "#161C24",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};


const paletteLight: PaletteOptions = {
  primary: {
    main: PRIMARY.main,
    light: PRIMARY.light,
    dark: PRIMARY.dark,
    contrastText: "#fff",
  },
  secondary: {
    main: SECONDARY.main,
    light: SECONDARY.light,
    dark: SECONDARY.dark,
    contrastText: "#2F4156",
  },
  info: {
    main: INFO.main,
    light: INFO.light,
    dark: INFO.dark,
    contrastText: "#2F4156",
  },
  success: {
    main: SUCCESS.main,
    light: SUCCESS.light,
    dark: SUCCESS.dark,
    contrastText: GREY[800],
  },
  warning: {
    main: WARNING.main,
    light: WARNING.light,
    dark: WARNING.dark,
    contrastText: GREY[800],
  },
  error: {
    main: ERROR.main,
    light: ERROR.light,
    dark: ERROR.dark,
    contrastText: "#fff",
  },
  grey: GREY,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  mode: "light",
  text: { primary: "#2F4156", secondary: GREY[600], disabled: GREY[500] },
  background: { paper: "#f8f8f8", default: "#fff" },
};

const paletteDark: PaletteOptions = {
  primary: {
    main: PRIMARY.main,
    light: PRIMARY.light,
    dark: PRIMARY.dark,
    contrastText: "#fff",
  },
  secondary: {
    main: SECONDARY.main,
    light: SECONDARY.light,
    dark: SECONDARY.dark,
    contrastText: "#fff",
  },
  info: {
    main: INFO.main,
    light: INFO.light,
    dark: INFO.dark,
    contrastText: "#fff",
  },
  success: {
    main: SUCCESS.main,
    light: SUCCESS.light,
    dark: SUCCESS.dark,
    contrastText: GREY[800],
  },
  warning: {
    main: WARNING.main,
    light: WARNING.light,
    dark: WARNING.dark,
    contrastText: GREY[800],
  },
  error: {
    main: ERROR.main,
    light: ERROR.light,
    dark: ERROR.dark,
    contrastText: "#fff",
  },
  grey: GREY,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  mode: "dark",
  text: { primary: "#fff", secondary: GREY[500], disabled: GREY[600] },
  background: { paper: GREY[800], default: GREY[900] },
};

export { paletteLight, paletteDark };
