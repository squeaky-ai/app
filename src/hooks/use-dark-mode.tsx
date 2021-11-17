import React from 'react';
import { DarkModeContext } from 'components/dark-mode';

export const useDarkMode = () => React.useContext(DarkModeContext);
