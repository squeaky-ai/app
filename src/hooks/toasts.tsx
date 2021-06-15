import React from 'react';
import { ToastContext } from '../components/toast';

export const useToasts = () => {
  const ctx = React.useContext(ToastContext);

  if (!ctx) {
    throw Error('The `useToasts` hook must be called from a descendent of the `ToastProvider`');
  }

  return { add: ctx.add };
};