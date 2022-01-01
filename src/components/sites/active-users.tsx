import React from 'react';
import type { FC } from 'react';
import { useActiveUsers } from 'hooks/use-active-users';

export const ActiveUsers: FC = () => {
  const { activeUsers, startPolling, stopPolling } = useActiveUsers();

  React.useEffect(() => {
    startPolling(5000);

    return () => {
      stopPolling();
    };
  }, []);

  return <span>{activeUsers}</span>;
};
