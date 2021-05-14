import { AppProps } from 'next/app';
import { FC } from 'react';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'components/BaseStyles';
import { ThemeProvider } from 'styled-components';
import squeakyTheme from 'theme/squeakyTheme';

const SqueakyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={squeakyTheme}>
      <Normalize />
      <BaseStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default SqueakyApp;
