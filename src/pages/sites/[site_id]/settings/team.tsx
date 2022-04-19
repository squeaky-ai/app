import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { InviteTeam } from 'components/sites/settings/invite-team';
import { TeamRow } from 'components/sites/settings/team-row';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Table, Row, Cell } from 'components/table';
import { Error } from 'components/error';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useTeam } from 'hooks/use-team';

const SiteSettingsTeam: NextPage<ServerSideProps> = ({ user }) => {
  const { error, team } = useTeam();

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Team</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Team' }]} />

            <h3 className='title'>
              Team
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <Container className='md'>
              <p>This page allows you to view, invite and manage the roles of any team members associated with this site. Adding members is always free of charge, regardless of their role.</p>
            </Container>

            <Table>
              <Row head>
                <Cell>Name</Cell>
                <Cell>Email address</Cell>
                <Cell>Role</Cell>
                <Cell>Options</Cell>
              </Row>
              {team.members.map(t => (
                <TeamRow key={t.id} team={t} site={site} user={user} />
              ))}
            </Table>

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
                  <li>View session recordings, visitors, analytics, feedback and heatmaps</li>
                  <li>Edit or alter recordings, visitors and feedback, including deletion</li>
                </ul>
              </div>
              <div className='role'>
                <h4>Admin</h4>
                <p>Site admins can:</p>
                <ul>
                  <li>Manage team members (excluding owner)</li>
                  <li>Manage site settings</li>
                  <li>View session recordings, visitors, analytics, feedback and heatmaps</li>
                  <li>Edit or alter recordings, visitors and feedback, including deletion</li>
                </ul>
              </div>
              <div className='role'>
                <h4>User</h4>
                <p>Site users can:</p>
                <ul>
                  <li>View session recordings, visitors, analytics, feedback and heatmaps</li>
                  <li>Edit or alter recordings, visitors and feedback, including deletion</li>
                </ul>
              </div>
            </div>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SiteSettingsTeam;
export { getServerSideProps };
