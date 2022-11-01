import React from 'react';
import type { FC } from 'react';
import { useActiveVisitors } from 'hooks/use-active-visitors';

export const ActiveVisitors: FC = () => {
  const { activeVisitors } = useActiveVisitors();

  return <span>{activeVisitors}</span>;
};
