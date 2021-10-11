import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Container } from 'components/container';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings-tabs';
import { Table, Row, Cell } from 'components/table';
import { SettingsIpCreate } from 'components/sites/settings-ip.create';
import { SettingsIpDelete } from 'components/sites/settings-ip-delete';
import { OWNER, ADMIN } from 'data/teams/constants';
import { ServerSideProps, getServerSideProps } from 'lib/auth';

const SitesSettingsIp: NextPage<ServerSideProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | IP Screening</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'IP Screening' }]} />

            <h3 className='title'>
              IP Screening
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} page='ip' />
            
            <Container className='md'>
              <p>You can ...</p>

              <Table className='ip-table'>
                <Row head>
                  <Cell>Name</Cell>
                  <Cell>Value</Cell>
                  <Cell>Options</Cell>
                </Row>

                {site.ipBlacklist.length === 0 && (
                  <Row fluid>
                    <p>There are currently no IP addresses screened for your site.</p>
                  </Row>
                )}

                {site.ipBlacklist.map(ip => (
                  <Row key={ip.value}>
                    <Cell>{ip.name}</Cell>
                    <Cell>{ip.value}</Cell>
                    <Cell><SettingsIpDelete siteId={site.id} ip={ip} /></Cell>
                  </Row>
                ))}
              </Table>

              <SettingsIpCreate siteId={site.id} />
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsIp;
export { getServerSideProps };
