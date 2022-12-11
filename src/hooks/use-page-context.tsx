import React from 'react';
import { PageContext, ContextProps } from 'components/page-provider';

export const usePageContext = (): ContextProps => React.useContext(PageContext);
