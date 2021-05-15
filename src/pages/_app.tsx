import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import React from 'react';
import type { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'components/BaseStyles';
import Section from 'components/Section';
import UniqueId from 'components/UniqueId';
import squeakyTheme from 'theme/squeakyTheme';

const SqueakyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UniqueId>
      <ThemeProvider theme={squeakyTheme}>
        <Section>
          <Normalize />
          <BaseStyles />
          <Component {...pageProps} />
        </Section>
      </ThemeProvider>
    </UniqueId>
  );
};

export default appWithTranslation(SqueakyApp);
