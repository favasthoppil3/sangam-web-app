import { createContext, ReactNode, useCallback, useMemo } from 'react';
import { PaletteMode } from '@mui/material';
import { ColorOption, ColorPreset } from '@/types/Settings';
import useLocalStorage from '@/hooks/useLocalStorage';
import getColorPresets, { defaultPreset, getColorOptions } from '@/utils/Colors';
import { defaultSettings } from '@/config/constants';

export type SettingsContextObject = {
  onChangeMode: (mode: PaletteMode) => void;
  onToggleMode: () => void;
  onChangeColor: (colorPreset: string) => void;
  onResetSetting: () => void;
  setColor: ColorPreset | undefined;
  colorOption: ColorOption[];
  themeMode: string;
  themeColorPresets: string;
};

const initialState = {
  ...defaultSettings,

  onChangeMode: (mode: PaletteMode) => {
    console.log('Change theme mode to', mode, ': default implmentation');
  },
  onToggleMode: () => {
    console.log('Toggle theme : default implmentation');
  },

  onChangeColor: (colorPreset: string) => {
    console.log('Change color preset to', colorPreset, ': default implmentation');
  },
  onResetSetting: () => {},
  setColor: defaultPreset,
  colorOption: [],
};

const SettingsContext = createContext<SettingsContextObject>(initialState);

export type SettingsProviderProps = {
  children: ReactNode;
};

export type Settings = {
  themeMode: string;
  themeColorPresets: string;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<Settings>('settings', {
    themeMode: initialState.themeMode,
    themeColorPresets: initialState.themeColorPresets,
  });

  const onChangeMode = useCallback(
    (mode: PaletteMode) => {
      setSettings({
        ...settings,
        themeMode: mode,
      });
    },
    [setSettings, settings]
  );

  const onToggleMode = useCallback(() => {
    console.log('HHHH');
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  }, [setSettings, settings]);

  const onChangeColor = useCallback(
    (colorPreset: string) => {
      setSettings({
        ...settings,
        themeColorPresets: colorPreset,
      });
    },
    [setSettings, settings]
  );

  const onResetSetting = useCallback(() => {
    setSettings({
      themeMode: initialState.themeMode,
      themeColorPresets: initialState.themeColorPresets,
    });
  }, [setSettings]);

  const memoizedSettings = useMemo(
    () => ({
      ...settings,
      onChangeMode,
      onToggleMode,
      onChangeColor,
      setColor: getColorPresets(settings.themeColorPresets),
      colorOption: getColorOptions(),
      onResetSetting,
    }),
    [onChangeColor, onChangeMode, onResetSetting, onToggleMode, settings]
  );
  console.log('memoizedSettings');
  console.log(memoizedSettings);

  return <SettingsContext.Provider value={memoizedSettings}>{children}</SettingsContext.Provider>;
}

export { SettingsProvider, SettingsContext };
