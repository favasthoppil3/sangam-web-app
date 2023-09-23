import useSettings from '@/hooks/useSettings';
import { useTheme } from '@mui/material';
import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export type StyledThemeProviderProps = {
  children: ReactNode;
};

function StyledThemeProvider({ children }: StyledThemeProviderProps) {
  const { themeMode } = useSettings();
  const theme = useTheme();

  return <ThemeProvider theme={{ ...theme, themeMode: themeMode as 'light' | 'dark' }}>{children}</ThemeProvider>;
}

export default StyledThemeProvider;
