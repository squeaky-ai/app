import React from 'react';
import type { FC } from 'react';

export const Page: FC = ({ children }) => {
  React.useEffect(() => {
    if (window && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const icons = document.querySelectorAll('link[rel="icon"]');
      
      icons.forEach(icon => {
        const href = icon.getAttribute('href');
        const isDark = href.includes('-dark');

        if (!isDark) {
          const [name, extention] = href.split('.');
          icon.setAttribute('href', `${name}-dark.${extention}`);
        }
      });
    }
  }, []);

  return <>{children}</>;
};
