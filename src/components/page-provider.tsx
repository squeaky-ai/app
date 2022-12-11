import React from 'react';
import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  role: number;
  validBilling: boolean;
  embedded: boolean;
}

export interface ContextProps {
  pageState: State;
  setPageState: (state: State) => void;
}

export const PageContext = React.createContext<ContextProps>(null);

const { Provider } = PageContext;

export const PageProvider: FC<Props> = ({ children }) => {
  const [pageState, setPageState] = React.useState<State>({
    role: -1,
    validBilling: true,
    embedded: false,
  });

  return (
    <Provider value={{ pageState, setPageState }}>
      {children}
    </Provider>
  );
};
