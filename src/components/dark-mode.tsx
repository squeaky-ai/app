import React from 'react';
import type { FC } from 'react';
import { Preferences, Preference } from 'lib/preferences';

interface DarkMode {
  darkModeEnabled: boolean;
  setDarkModeEnabled: (enabled: boolean) => void;
}

export const DarkModeContext = React.createContext<DarkMode>({
  darkModeEnabled: false,
  setDarkModeEnabled: (_enabled: boolean) => undefined,
});

export const DarkModeProvider: FC = ({ children }) => {
  const [enabled, setEnabled] = React.useState<boolean>(false);

  const setDarkModeEnabled = (enabled: boolean) => {
    setEnabled(enabled);
    Preferences.setBoolean(Preference.DARK_MODE_ENABLED, enabled);
  };

  React.useEffect(() => {
    const enabled = Preferences.getBoolean(Preference.DARK_MODE_ENABLED) || false;
    setEnabled(enabled);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkModeEnabled: enabled, setDarkModeEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};
