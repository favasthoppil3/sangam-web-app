import { Shadows } from '@mui/material';

export type ColorPreset = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ColorOption = {
  name: string;
  value: string;
};

export interface MyGrey {
  500_32: string;
  500_56: string;
  500_12: string;
  500_16: string;
  500_48: string;
}

interface MyTheme {
  shadows?: Shadows;
  customShadows: any;
}

interface MyPalette {
  [key: string]: any;
}

interface MyTypeBackground {
  neutral: string;
}

interface MyPaletteColor {
  lighter: string;
  darker: string;
}

interface MyThemeOptions {
  shadows: any[];
}

declare module '@mui/material' {
  interface Theme extends MyTheme {}
  interface Color extends MyGrey {}
}

declare module '@mui/material/styles' {
  export interface Palette extends MyPalette {}
  export interface TypeBackground extends MyTypeBackground {}
  export interface PaletteColor extends MyPaletteColor {}
  export interface ThemeOptions extends MyThemeOptions {}
}
