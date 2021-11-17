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
    const preference = Preferences.getRaw(Preference.DARK_MODE_ENABLED);

    if (preference) {
      setEnabled(preference === 'true');
    } else {
      const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setEnabled(dark);
    }
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkModeEnabled: enabled, setDarkModeEnabled }}>
      {children}
    </DarkModeContext.Provider>
  );
};
