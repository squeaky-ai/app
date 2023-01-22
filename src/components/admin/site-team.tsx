import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Row, Table, Cell } from 'components/table';
import { SiteTeamDelete } from 'components/admin/site-team-delete';
import { SiteTeamRole } from 'components/admin/site-team-role';
import { INVITED } from 'data/teams/constants';
import type { AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
}

export const SiteTeam: FC<Props> = ({ site }) => (
  <div className='site-team'>
    <Table>
      <Row className='head'>
        <Cell>Name</Cell>
        <Cell>Status</Cell>
        <Cell>Role</Cell>
        <Cell />
      </Row>
      {site.team.map(team => (
        <Row key={team.id}>
          <Cell>
            <Link href={`/__admin/users/${team.user.id}`}>
              {team.user.fullName || '-'}
            </Link>
          </Cell>
          <Cell>{team.status === INVITED ? 'Invited' : 'Accepted'}</Cell>
          <Cell>
            <SiteTeamRole team={team} />
          </Cell>
          <Cell>
            <SiteTeamDelete team={team} />
          </Cell>
        </Row>
      ))}
    </Table>
  </div>  
);
