import React from 'react';
import type { FC } from 'react';
import { useActiveVisitors } from 'hooks/use-active-visitors';

export const ActiveVisitors: FC = () => {
  const { activeVisitors, startPolling, stopPolling } = useActiveVisitors();

  React.useEffect(() => {
    startPolling(5000);

    return () => {
      stopPolling();
    };
  }, []);

  return <span>{activeVisitors}</span>;
};
