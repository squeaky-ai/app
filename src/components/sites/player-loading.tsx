import React from 'react';
import type { FC } from 'react';
import { Spinner } from 'components/spinner';

export const PlayerLoading: FC = () => (
  <main id='player'>
    <Spinner />
  </main>
);
