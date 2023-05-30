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
import { Roles } from 'components/sites/team/roles';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { OWNER, ADMIN } from 'data/teams/constants';
import { providers } from 'data/sites/constants';
import { useTeam } from 'hooks/use-team';
import { Message } from 'components/message';

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
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Team' }]} />

            <h4 className='title'>
              Team
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <Container className='md'>
              {site.provider === providers.duda && (
                <Message
                  type='warning'
                  message={
                    <p><b>Please note</b>: Due to limitations in the way that your content management system manages multi-user authentication, only the Squeaky site owner role can visit Squeaky from within the CMS. Any additional team members you add will be invited to access Squeaky directly through Squeaky&apos;s web application.</p>
                  }
                />
              )}
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

            <Roles />
          </Main>
        )}
      </Page>
    </>
  );
};

export default SiteSettingsTeam;
export { getServerSideProps };
