import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import React from 'react';
import type { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'components/BaseStyles';
import Section from 'components/Section';
import SqueakyProvider from 'components/SqueakyProvider';
import UniqueId from 'components/UniqueId';
import squeakyTheme from 'theme/squeakyTheme';

import 'remixicon/fonts/remixicon.css';

const SqueakyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <UniqueId>
      <SqueakyProvider>
        <ThemeProvider theme={squeakyTheme}>
          <Section>
            <Normalize />
            <BaseStyles />
            <Component {...pageProps} />
          </Section>
        </ThemeProvider>
      </SqueakyProvider>
    </UniqueId>
  );
};

export default appWithTranslation(SqueakyApp);
