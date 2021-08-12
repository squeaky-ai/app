import React from 'react';
import { ToastContext, ToastItem } from 'components/toast';

interface UseToasts {
  add: (value: ToastItem) => void;
}

export const useToasts = (): UseToasts => {
  const ctx = React.useContext(ToastContext);

  if (!ctx) {
    throw Error('The `useToasts` hook must be called from a descendent of the `ToastProvider`');
  }

  return { add: ctx.add };
};
