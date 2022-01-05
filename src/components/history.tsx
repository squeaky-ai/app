import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';

interface ContextProps {
  history: string[];
}

export const HistoryContext = React.createContext<ContextProps>({ history: [] });

const { Provider } = HistoryContext;

export const HistoryProvider: FC = ({ children }) => {
  const router = useRouter();

  const [history, setHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (history[history.length - 1] !== router.asPath) {
      setHistory([...history, router.asPath]);
    }
  }, [router.asPath]);

  return (
    <Provider value={{ history }}>
      {children}
    </Provider>
  );
};
