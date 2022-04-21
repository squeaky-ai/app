import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';

export interface HistoryItem {
  path: string;
  route: string;
}

interface ContextProps {
  history: HistoryItem[];
}

export const HistoryContext = React.createContext<ContextProps>({ history: [] });

const { Provider } = HistoryContext;

export const HistoryProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const [history, setHistory] = React.useState<HistoryItem[]>([]);

  React.useEffect(() => {
    if (history[history.length - 1]?.path !== router.pathname) {
      setHistory([...history, { path: router.asPath, route: router.pathname }]);
    }
  }, [router.pathname]);

  return (
    <Provider value={{ history }}>
      {children}
    </Provider>
  );
};
