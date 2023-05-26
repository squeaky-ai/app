import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from 'components/container';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { GenerateApiKey } from 'components/sites/settings/generate-api-key';
import { Icon } from 'components/icon';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings/settings-tabs';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { OWNER, ADMIN } from 'data/teams/constants';
import { useToasts } from 'hooks/use-toasts';
import { generateApiKey } from 'lib/api/graphql';

const SiteSettingsApiKey: NextPage<ServerSideProps> = ({ user }) => {
  const toasts = useToasts();
  const [copying, setCopying] = React.useState<boolean>(false);

  const copy = async (apiKey: string) => {
    setCopying(true);

    await navigator.clipboard.writeText(apiKey);

    setTimeout(() => {
      setCopying(false);
    }, 2000);
  };

  const createApiKey = async (siteId: string) => {
    try {
      await generateApiKey({ siteId });
      toasts.add({ type: 'success', body: 'API Key generated successfully' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'There was an error generating your API Key' });
    }
  };

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | API Key</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site, member }) => (
          <Main>
            <BreadCrumbs site={site} member={member} items={[{ name: 'API Key' }]} />

            <h4 className='title'>
              Site Settings
              <Access roles={[OWNER, ADMIN]} />
            </h4>

            <SettingsTabs site={site} member={member} page='api-key' />

            <h4>API Key</h4>

            <Container className='md'>
              {site.apiKey && (
                <>
                  <div className='input-group'>
                    <Input
                      name='api-key'
                      value={site.apiKey}
                      disabled
                      readOnly
                    />
                    <Button className='link icon' onClick={() => copy(site.apiKey)}>
                      <Icon name='file-copy-line' />
                      {copying ? 'Copied!' : 'Copy to clipboard'}
                    </Button>
                  </div>

                  <GenerateApiKey handleGenerate={() => createApiKey(site.id)} />
                </>
              )}

              {!site.apiKey && (
                <>
                  <p>Us the button below to generate your Squeaky API Key, this is specific to your site and can be used for things like sending custom event tracking data to Squeaky.</p>
                  <Button className='primary' onClick={() => createApiKey(site.id)}>
                    Generate API Key
                  </Button>
                </>
              )}
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SiteSettingsApiKey;
export { getServerSideProps };
