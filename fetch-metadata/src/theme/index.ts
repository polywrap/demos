import { createTheme } from "@mui/material";

export const polywrapPalette = {
  primary: {
    gradient: 'linear-gradient(to right, #74DD9F 20%, #000000, 20%)',
    start: '#74DD9F',
    mid: '#4ED29F',
    end: '#27C69F',
    700: '#06644D',
    direction: '120deg',
  },
  secondary: {
    start: '#1B5FED',
    mid: '#1B6DED',
    end: '#1B87ED',
    300: '#66D9EF',
    800: '#293653',
    900: '#1E2B45',
    1000: '#1d2538',
    direction: 179,
  },
  tertiary: {
    gradient: 'linear-gradient(to right, #FFC272, #FFE272)',
    400: '#FFE272',
    500: '#FFC272',
    direction: 0,
  },
  purple: {
    300: '#BB95FF',
    400: '#AE81FF',
  },
  wrapGradient: {
    gradient: 'linear-gradient(0deg, #000000 35%, #FFFFFF 35%)',
    start: '#878787',
    end: '#FFFFFF',
    direction: 0,
    opacity: 0.35,
  },
  black: '#000000',
  white: '#FFFFFF',
}

export const darkTheme = createTheme({
  spacing: 4,
  palette: {
    mode: 'dark',
    primary: {
      main: polywrapPalette.primary.start,
      dark: polywrapPalette.primary.end,
    },
    secondary: {
      main: polywrapPalette.secondary.end,
      dark: polywrapPalette.secondary.start,
    },
    text: {
      primary: polywrapPalette.white,
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.3)',
    },
    background: {
      default: polywrapPalette.secondary['900'],
    }
  },
  typography: {
    fontFamily: `'Raleway', sans-serif`,
    h1: {
      fontSize: 64,
      fontWeight: 900,
      lineHeight: 1,
    },
    h2: {
      fontSize: 48,
      fontWeight: 900,
      lineHeight: 1,
      color: polywrapPalette.white,
    },
    h3: {
      fontSize: 40,
      fontWeight: 900,
      lineHeight: 1,
      '@media (max-width:650px)': {
        fontSize: 32,
      },
      color: polywrapPalette.white,
    },
    h4: {
      fontSize: 32,
      fontWeight: 900,
      lineHeight: 1,
      '@media (max-width:650px)': {
        fontSize: 28,
      },
    },
    subtitle1: {
      fontSize: 24,
      fontWeight: 900,
      lineHeight: 1.5,
      color: polywrapPalette.white,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 900,
      lineHeight: 1.5,
      color: polywrapPalette.white,
    },
    body1: {
      fontFamily: `-apple-system,BlinkMacSystemFont,"Roboto",Helvetica,Arial,sans-serif,"Apple Color Emoji"`,
      fontSize: 16,
      lineHeight: 1.75,
      color: polywrapPalette.white,
    },
    body2: {
      fontFamily: `-apple-system,BlinkMacSystemFont,"Roboto",Helvetica,Arial,sans-serif,"Apple Color Emoji"`,
      fontSize: 16,
      lineHeight: 1.75,
      color: "rgba(255,255,255,0.7)",
    },
  },
});