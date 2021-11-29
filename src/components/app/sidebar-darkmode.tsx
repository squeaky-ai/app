import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { useDarkMode } from 'hooks/use-dark-mode';

export const SidebarDarkmode: FC = () => {
  const { darkModeEnabled, setDarkModeEnabled } = useDarkMode();

  return (
    <Button className={classnames('link', { active: darkModeEnabled })} onClick={() => setDarkModeEnabled(!darkModeEnabled)} data-label={darkModeEnabled ? 'Use Light Mode' : 'Use Dark Mode'}>
      <i className='ri-sun-line' />
    </Button>
  );
};
