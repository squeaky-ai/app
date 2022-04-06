import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { ActiveVisitorCount } from 'types/graphql';
import { useAdminActiveVisitors } from 'hooks/use-admin-active-visitors';

interface Children {
  activeVisitorCount: ActiveVisitorCount[];
}

interface Props {
  children: (site: Children) => React.ReactElement;
}

export const Page: FC<Props> = ({ children }) => {
  const { activeVisitorCount } = useAdminActiveVisitors();

  return (
    <>
      <Main>
        {children({ activeVisitorCount })}
      </Main>
    </>
  );
};
