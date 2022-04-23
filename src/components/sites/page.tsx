import React from 'react';
import type { FC, ReactElement } from 'react';
import { useSite } from 'hooks/use-site';
import { NotFound } from 'components/sites/not-found';
import { Unauthorized } from 'components/sites/unauthorized';
import { ErrorBoundary } from 'components/sites/error-boundary';
import { useSidebar } from 'hooks/use-sidebar';
import type { User, Team } from 'types/graphql';
import type { Site } from 'types/graphql';
import { Error } from 'components/error';

interface Children {
  site: Site;
  member: Team;
}

interface Props {
  user: User;
  scope: number[];
  children: (site: Children) => ReactElement;
}

export const getTeamMember = (site: Site, user: User): Team | null => {
  if (!site?.team || !user) return null;

  return site.team.find(team => team.user.id.toString() === user.id.toString());
};

export const Page: FC<Props> = ({ children, user, scope }) => {
  const { loading, error, site } = useSite();
  const { setSidebar } = useSidebar();

  const member = getTeamMember(site, user);
  const authorized = user.superuser 
    ? false 
    : scope.length ? scope.includes(member?.role) : true;

  React.useEffect(() => {
    if (site) {
      // This is really jank to do here. In the old days you'd use a
      // selector inside of the sidebar and fetch the data once it's
      // there, but Apollo doesn't have a way of reading directly from
      // the cache and being notified of changes.
      setSidebar({ 
        role: member?.role, 
        validBilling: !site.plan.invalid 
      });
    }
  }, [site]);

  return (
    <>
      {error && (
        <Error className='site-page-error' />
      )}

      {!loading && !site && !error && (
        <NotFound className='site-page-error' />
      )}

      {site && !authorized && (
        <Unauthorized />
      )}

      <ErrorBoundary>
        {site && authorized && children({ site, member })}
      </ErrorBoundary>
    </>
  );
};
