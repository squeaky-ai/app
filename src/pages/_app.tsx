import { AppProps } from 'next/app';
import { FC } from 'react';
import { Normalize } from 'styled-normalize';
import BaseStyles from 'components/BaseStyles';

const SqueakyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Normalize />
      <BaseStyles />
      <Component {...pageProps} />
    </>
  );
};

export default SqueakyApp;
