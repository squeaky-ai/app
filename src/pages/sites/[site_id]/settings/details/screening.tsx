import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Label } from 'components/label';
import { Access } from 'components/sites/access';
import { Container } from 'components/container';
import { Page } from 'components/sites/page';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { Table, Row, Cell } from 'components/table';
import { Message } from 'components/message';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { SettingsScreeningIpCreate } from 'components/sites/settings/settings-screening-ip-create';
import { SettingsScreeningDomainCreate } from 'components/sites/settings/settings-screening-domain-create';
import { SettingsScreeningEmailCreate } from 'components/sites/settings/settings-screening-email-create';
import { OWNER, ADMIN } from 'data/teams/constants';
import { domainBlacklistDelete, ipBlacklistDelete } from 'lib/api/graphql';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { useToasts } from 'hooks/use-toasts';

const SitesSettingsIp: NextPage<ServerSideProps> = ({ user }) => {
  const toasts = useToasts();

  const deleteIp = async (siteId: string, value: string) => {
    try {
      await ipBlacklistDelete({ siteId, value });

      toasts.add({ type: 'success', body: 'IP deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the IP' });
    }
  };

  const deleteDomain = async (siteId: string, value: string) => {
    try {
      await domainBlacklistDelete({ siteId, value });

      toasts.add({ type: 'success', body: 'Domain deleted successfully' });
    } catch {
      toasts.add({ type: 'error', body: 'There was an issue deleting the domain' });
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Screening</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Screening' }]} />

            <h4 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <SettingsTabs site={site} member={member} page='screening' />
            
            <Container className='md'>
              <h4>Screening</h4>

              <p>Sometimes you don&apos;t want to record particular visitors e.g. if members of your team are using your product, you may not want these visits to influence your recordings or analytics. Luckily, we have a few options below to help you screen out these visitors in advance.</p>

              <Label className='section'>
                <span>IP Address</span>
                <a href='https://www.iplocation.net/find-ip-address' target='_blank' rel='noreferrer' className='external-link'>
                  <span>Find Your IP Address</span> <Icon name='external-link-line' />
                </a>
              </Label>

              <p>Squeaky does not track your visitors IP addresses, but we can help by making sure that the script on your website rejects users based on their IP address without the data ever being passed to Squeaky.</p>
              <p><b>Note</b>: This feature will not work for users that use a VPN.</p>

              {site.ipBlacklist.length > 0 && (
                <Table className='ip-table'>
                  <Row head>
                    <Cell>Name</Cell>
                    <Cell>IP Address</Cell>
                    <Cell>Options</Cell>
                  </Row>

                  {site.ipBlacklist.map(ip => (
                    <Row key={ip.value}>
                      <Cell><b>{ip.name}</b></Cell>
                      <Cell>{ip.value}</Cell>
                      <Cell><Button className='link tertiary' onClick={() => deleteIp(site.id, ip.value)}>Remove</Button></Cell>
                    </Row>
                  ))}
                </Table>
              )}

              <SettingsScreeningIpCreate siteId={site.id} />

              <Label className='section'>
                Domain &amp; Email Screening
              </Label>

              <Message 
                type='info'
                message={
                  <p>This feature is only available if you have are using the data linking feature in Squeaky. There is developer documentation for data linking <a target='_blank' href='/developers'>here</a>.</p>
                }
              />

              <p>If you&apos;re using the data linking feature then you&apos;ll be able to automatically screen out all visits and recordings from the user email address you synchronise with Squeaky from your app or website. You can do this on an domain level, or per email.</p>

              {site.domainBlacklist.length > 0 && (
                <Table className='ip-table'>
                  <Row head>
                    <Cell>Type</Cell>
                    <Cell>Value</Cell>
                    <Cell>Options</Cell>
                  </Row>

                  {site.domainBlacklist.map(ip => (
                    <Row key={ip.value}>
                      <Cell><b>{ip.type === 'domain' ? 'Domain' : 'Email'}</b></Cell>
                      <Cell>{ip.value}</Cell>
                      <Cell><Button className='link tertiary' onClick={() => deleteDomain(site.id, ip.value)}>Remove</Button></Cell>
                    </Row>
                  ))}
                </Table>
              )}
              
              <div className='actions'>
                <SettingsScreeningDomainCreate siteId={site.id} />
                <SettingsScreeningEmailCreate siteId={site.id} />
              </div>
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsIp;
export { getServerSideProps };
