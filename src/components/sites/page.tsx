import React from 'react';
import type { FC, ReactElement } from 'react';
import { useSite } from 'hooks/sites';
import { Unauthorized } from 'components/sites/unauthorized';
import type { User } from 'types/user';
import type { Site } from 'types/site';
import type { Team } from 'types/team';

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
  const [loading, site] = useSite();

  const member = getTeamMember(site, user);
  const authorized = scope.length ? scope.includes(member?.role) : true;

  return (
    <>
      {!loading && !authorized && (
        <Unauthorized />
      )}

      {site && authorized && children({ site, member })}
    </>
  )
};
