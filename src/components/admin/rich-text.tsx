import React from 'react';
import type { FC } from 'react';

export interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const RichText: FC<Props> = () => {
  return (
    <></>
  );
};