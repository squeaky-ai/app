import React from 'react';
import { throttle } from 'lodash';

export interface Resize {
  height: number;
  width: number;
}

export const useResize = (): Resize => {
  const [resize, setResize] = React.useState<Resize>({ height: 0, width: 0 });

  const onResize = throttle(() => {
    setResize({ 
      height: window.innerHeight, 
      width: window.innerWidth 
    });
  }, 50);

  React.useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize, true);
    }
  }, []);

  return resize;
};
