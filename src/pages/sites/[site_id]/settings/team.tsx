import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Icon } from 'components/icon';
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

            <h4 className='title'>
              Team
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <Container className='md'>
              <p>This page allows you to view, invite and manage the roles of any team members associated with this site. Adding members is always free of charge, regardless of their role.</p>
            </Container>

            <Table>
              <Row head>
                <Cell>Name</Cell>
                <Cell>Email address</Cell>
                <Cell>Role</Cell>
                <Cell>Linked Data Visibility</Cell>
                <Cell>Options</Cell>
              </Row>
              {team.members.map(t => (
                <TeamRow key={t.id} team={t} site={site} user={user} />
              ))}
            </Table>

            <InviteTeam site={site} />

            <h4>Roles</h4>

            <Container className='md'>
              <p>Roles are site-specific and determine what level of access individual team members have to site settings and features. To see a full break down of the roles in Squeaky please visit our <a className='external-link' href='https://www.notion.so/The-different-roles-in-Squeaky-3e43f2373dac444b961930aed545e74b' target='_blank' rel='noreferrer'><span>Help center</span> <Icon name='external-link-line' /></a>.</p>
            </Container>

            <div className='roles'>
              <div className='role'>
                <h5>Owner</h5>
                <p>The site owner can access or manage:</p>
                <ul>
                  <li><Icon name='check-line' /> Subscription and billing settings</li>
                  <li><Icon name='check-line' /> Team member settings</li>
                  <li><Icon name='check-line' /> Site settings</li>
                  <li><Icon name='check-line' /> Privacy settings</li>
                  <li><Icon name='check-line' /> All analysis functionality</li>
                  <li><Icon name='check-line' /> All data capture functionality</li>
                  <li><Icon name='check-line' /> All feedback functionality</li>
                </ul>
              </div>
              <div className='role'>
                <h5>Admin</h5>
                <p>Site admins can access or manage:</p>
                <ul>
                  <li><Icon name='check-line' /> Team member settings</li>
                  <li><Icon name='check-line' /> Site settings</li>
                  <li><Icon name='check-line' /> Privacy settings</li>
                  <li><Icon name='check-line' /> All analysis functionality</li>
                  <li><Icon name='check-line' /> All data capture functionality</li>
                  <li><Icon name='check-line' /> All feedback functionality</li>
                </ul>
              </div>
              <div className='role'>
                <h5>User</h5>
                <p>Site users can access:</p>
                <ul>
                  <li><Icon name='check-line' /> All analysis functionality</li>
                  <li><Icon name='check-line' /> All data capture functionality</li>
                  <li><Icon name='check-line' /> All feedback functionality</li>
                </ul>
                <p>Site users cannot:</p>
                <ul>
                  <li><Icon name='close-line' className='negative' /> Delete data e.g. visitors, recordings, feedback</li>
                </ul>
              </div>
              <div className='role'>
                <h5>Read-only</h5>
                <p>Read-only users can access:</p>
                <ul>
                  <li><Icon name='check-line' /> All analysis data</li>
                  <li><Icon name='check-line' /> All data capture data</li>
                  <li><Icon name='check-line' /> All feedback data</li>
                </ul>
                <p>Site read-only users cannot:</p>
                <ul>
                  <li><Icon name='close-line' className='negative' /> Edit, Add or Delete data e.g. visitors, recordings, feedback, Notes &amp; Tags.</li>
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
