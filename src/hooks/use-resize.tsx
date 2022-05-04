import React from 'react';
import { throttle } from 'lodash';

export interface Resize {
  height: number;
  width: number;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

export const useResize = (): Resize => {
  const [resize, setResize] = React.useState<Resize>({ 
    height: 0, 
    width: 0,
    desktop: true,
    tablet: false,
    mobile: false,
  });

  const onUpdate = () => {
    const { innerWidth, innerHeight } = window;

    setResize({
      height: innerHeight, 
      width: innerWidth,
      desktop: innerWidth >= 960,
      tablet: innerWidth > 540 && innerWidth < 960,
      mobile: innerWidth <= 540,
    });
  };

  const onResize = throttle(() => onUpdate(), 50);

  React.useEffect(() => {
    onUpdate();

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize, true);
    }
  }, []);

  return resize;
};
