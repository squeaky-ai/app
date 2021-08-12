import React from 'react';

const KEY = 'login_attemps';
export const MAX_ATTEMPTS = 10;

interface UseLoginAttemps {
  attempts: number;
  exceeded: boolean;
  incr: VoidFunction;
  clear: VoidFunction;
}

export const useLoginAttemps = (): UseLoginAttemps => {
  const getOrCreate = (): number => {
    if (typeof sessionStorage === 'undefined') {
      return 0;
    }

    const value = sessionStorage.getItem(KEY) || sessionStorage.setItem(KEY, '0');
    return Number(value || '0');
  };

  const [attempts, setAttempts] = React.useState(getOrCreate());

  const incr = (): void => {
    sessionStorage.setItem(KEY, (attempts + 1).toString());
    setAttempts(attempts + 1);
  };

  const clear = (): void => {
    sessionStorage.removeItem(KEY);
    setAttempts(0);
  };

  return {
    attempts, 
    exceeded: attempts >= MAX_ATTEMPTS, 
    incr, 
    clear
  };
};
