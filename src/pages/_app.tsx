import { AppProps } from 'next/app';
import { FC } from 'react';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'components/BaseStyles';
import { ThemeProvider } from 'styled-components';
import squeakyTheme from 'theme/squeakyTheme';
import Section from 'components/Section';
import UniqueId from 'components/UniqueId';

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

export default SqueakyApp;
