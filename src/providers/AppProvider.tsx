import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from '@/theme';
import StyledThemeProvider from '@/providers/StyledThemeProvider';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { store } from '@/store';
import ConfirmationDialogProider from '@/components/shared/Confirmation';

export type AppProviderProps = {
  children: ReactNode;
};

function AppProvider({ children }: AppProviderProps) {
  return (
    <ReduxProvider store={store}>
      <SettingsProvider>
        <ThemeProvider>
          <StyledThemeProvider>
            <ConfirmationDialogProider>
              <HelmetProvider>
                {/* <AuthProvider> */}
                <Router>{children}</Router>
                {/* </AuthProvider> */}
              </HelmetProvider>
            </ConfirmationDialogProider>
          </StyledThemeProvider>
        </ThemeProvider>
      </SettingsProvider>
    </ReduxProvider>
  );
}

export default AppProvider;
