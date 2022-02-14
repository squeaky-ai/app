import React from 'react';
import type { FC } from 'react';

interface State {
  role: number;
  validBilling: boolean;
}

export interface ContextProps {
  sidebar: State;
  setSidebar: (state: State) => void;
}

export const SidebarContext = React.createContext<ContextProps>(null);

const { Provider } = SidebarContext;

export const SidebarProvider: FC = ({ children }) => {
  const [sidebar, setSidebar] = React.useState<State>({
    role: -1,
    validBilling: true,
  });

  return (
    <Provider value={{ sidebar, setSidebar }}>
      {children}
    </Provider>
  );
};
