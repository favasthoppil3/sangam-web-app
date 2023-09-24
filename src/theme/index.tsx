import { ReactNode, useMemo } from 'react';
import { CssBaseline, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import useSettings from '@/hooks/useSettings';
import componentsOverride from '@/theme/overrides';
import palette from './palette';
import typography from './typography';
import shadows, { customShadows } from './shadows';

export type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themeMode } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      shape: { borderRadius: 10 },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
      spacing: 6,
      breakpoints: {
        values: {
          xs: 0,
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200,
          xxl: 1400,
        },
      },
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
