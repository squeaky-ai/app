import React from 'react';

const KEY = 'login_attemps';
export const MAX_ATTEMPTS = 10;

type UseLoginAttemps = [number, boolean, VoidFunction, VoidFunction];

export const useLoginAttemps = (): UseLoginAttemps => {
  const getOrCreate = (): number => {
    if (typeof sessionStorage === 'undefined') {
      return 0;
    }

    const value = sessionStorage.getItem(KEY) || sessionStorage.setItem(KEY, '0');
    return Number(value || '0');
  };

  const [attemps, setAttemps] = React.useState(getOrCreate());

  const incr = (): void => {
    sessionStorage.setItem(KEY, (attemps + 1).toString());
    setAttemps(attemps + 1);
  };

  const clear = (): void => {
    sessionStorage.removeItem(KEY);
    setAttemps(0);
  };

  return [attemps, attemps >= MAX_ATTEMPTS, incr, clear];
};
