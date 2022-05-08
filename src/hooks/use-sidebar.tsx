import React from 'react';
import { SidebarContext, ContextProps } from 'components/sidebar';

export const useSidebar = (): ContextProps => React.useContext(SidebarContext);
