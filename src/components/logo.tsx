import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import type { ImageProps } from 'next/image';
import { BASE_PATH } from 'data/common/constants';

interface Props extends ImageProps {}

export const Logo: FC<Props> = ({ src, ...props }) => {
  const [dark, setDark] = React.useState<Boolean>(false);

  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDark(true);
    }
  }, []);

  return <Image src={`${BASE_PATH}/${src}${dark ? '-dark' : ''}.svg`} {...props} />;
};
