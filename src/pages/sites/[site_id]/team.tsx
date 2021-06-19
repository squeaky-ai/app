import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../../../components/container';
import { Header } from '../../../components/sites/header';
import { Main } from '../../../components/main';
import { Tabs } from '../../../components/sites/tabs';
import { Access } from '../../../components/sites/access';
import { InviteTeam } from '../../../components/sites/invite-team';
import { TeamRow } from '../../../components/sites/team-row';
import { Unauthorized } from '../../../components/sites/unauthorized';
import { ServerSideProps, getServerSideProps } from '../../../lib/auth';
import { getTeamMember } from '../../../lib/sites';
import { OWNER, ADMIN } from '../../../data/teams/constants';
import { useSite } from '../../../hooks/sites';

const SitesTeam: NextPage<ServerSideProps> = ({ user }) => {
  const [loading, site] = useSite();

  const member = getTeamMember(site, user);
  const authorized = [OWNER, ADMIN].includes(member?.role);

  return (
    <div className='page team'>
      <Head>
        <title>Squeaky / Site Team</title>
      </Head>

      <Header />

      {!loading && !authorized && (
        <Unauthorized />
      )}

      {site && authorized && (
        <Main>
          <Tabs site={site} user={user} page='team' />
          <h3 className='title'>
            Team
            <Access roles={[OWNER, ADMIN]} />
          </h3>

          <Container className='md'>
            <p>This page allows you to view, invite and manage the roles of any team members associated with this site. Adding members is always free of charge, regardless of their role.</p>
          </Container>

          <div className='table'>
            <table cellSpacing='0'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email address</th>
                  <th>Role</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {site.team.map(team => <TeamRow key={team.id} team={team} site={site} user={user} />)}
              </tbody>
            </table>
          </div>

          <InviteTeam site={site} />

          <h3>Roles</h3>

          <Container className='md'>
            <p>Roles are site-specific and determine what level of control individual team members have over any site they are associated with, only admins and owners can edit roles.</p>
          </Container>

          <div className='roles'>
            <div className='role'>
              <h4>Owner</h4>
              <p>The site owner can:</p>
              <ul>
                <li>Manage site billing</li>
                <li>Manage team members</li>
                <li>Manage site settings</li>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
            <div className='role'>
              <h4>Admin</h4>
              <p>Site admins can:</p>
              <ul>
                <li>Manage team members (excluding owner)</li>
                <li>Manage site settings</li>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
            <div className='role'>
              <h4>User</h4>
              <p>Site users can:</p>
              <ul>
                <li>View session recordings and analytics</li>
                <li>Edit or alter recordings, including deletion</li>
              </ul>
            </div>
          </div>
        </Main>
      )}
    </div>
  );
};

export default SitesTeam;
export { getServerSideProps };
