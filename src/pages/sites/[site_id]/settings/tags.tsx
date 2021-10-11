import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Main } from 'components/main';
import { Access } from 'components/sites/access';
import { Page } from 'components/sites/page';
import { OWNER, ADMIN } from 'data/teams/constants';
import { Container } from 'components/container';
import { Checkbox } from 'components/checkbox';
import { Table, Row, Cell } from 'components/table';
import { Dropdown } from 'components/dropdown';
import { SettingsTag } from 'components/sites/settings-tag';
import { Sort } from 'components/sort';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { SettingsTabs } from 'components/sites/settings-tabs';
import { SettingsTagsDelete } from 'components/sites/settings-tags-delete';
import { SettingsTagsMerge } from 'components/sites/settings-tags-merge';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import type { Site } from 'types/site';

const QUERY = gql`
  query GetSiteTags($siteId: ID!) {
    site(siteId: $siteId) {
      id
      tags {
        id
        name
      }
    }
  }
`;

const SitesSettingsTags: NextPage<ServerSideProps> = ({ user }) => {
  const router = useRouter();
  const siteId = router.query.site_id as string;
  const [sort, setSort] = React.useState<string>('name__asc');
  const [selected, setSelected] = React.useState<string[]>([]);

  const { data } = useQuery<{ site: Site }>(QUERY, {
    variables: { siteId }
  });

  const tags = data ? data.site.tags : [];

  const results = [...tags].sort((a, b) => sort === 'name__asc'
    ? a.name.localeCompare(b.name)
    : b.name.localeCompare(a.name)
  );

  const onSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected(tags.map(t => t.id))
      : setSelected([]);
  };

  const selectedTags = selected.map(s => tags.find(t => t.id === s));

  const onCompleted = () => setSelected([]);

  return (
    <>
      <Head>
        <title>Squeaky | Site Settings | Tags</title>
      </Head>

      <Page user={user} scope={[OWNER, ADMIN]}>
        {({ site }) => (
          <Main>
            <BreadCrumbs site={site} items={[{ name: 'Settings', href: `/sites/${site.id}/settings/details` }, { name: 'Tags' }]} />

            <h3 className='title'>
              Tags
              <Access roles={[OWNER, ADMIN]} />
            </h3>

            <SettingsTabs site={site} page='tags' />

            <Container className='md'>
              <p>You can add tags to your recordings to better document and categorise your findings. The table below lists any tags you have already created. You can delete, merge or rename tags using the options in the table.</p>

              {tags.length > 0 && (
                <div className='bulk-actions'>
                  <Dropdown direction='down' buttonClassName={classnames({ disabled: selected.length === 0 })} button={<><i className='ri-checkbox-multiple-line' /> Bulk Actions</>}>
                    <SettingsTagsMerge tags={selectedTags} siteId={siteId} onCompleted={onCompleted} />
                    <SettingsTagsDelete tags={selectedTags} siteId={siteId} onCompleted={onCompleted} />
                  </Dropdown>
                </div>
              )}

              <Table className='tags-table'>
                <Row head>
                  <Cell>
                    <Checkbox
                      checked={selected.length === tags.length && tags.length !== 0}
                      partial={selected.length !== 0 && selected.length !== tags.length && tags.length !== 0}
                      disabled={tags.length === 0}
                      onChange={onSelectAll} 
                    />
                  </Cell>
                  <Cell>
                    Tag name
                    <Sort 
                      name='name' 
                      order={sort} 
                      onAsc={() => setSort('name__asc')} 
                      onDesc={() => setSort('name__desc')} 
                    />
                  </Cell>
                  <Cell>Options</Cell>
                </Row>
                {tags.length === 0 && (
                  <Row fluid>
                    <p>There are currently no tags created for your site.</p>
                  </Row>
                )}

                {results.map(tag => (
                  <SettingsTag 
                    key={tag.id} 
                    tag={tag} 
                    siteId={siteId} 
                    selected={selected}
                    setSelected={setSelected}
                  />
                ))}
              </Table>
            </Container>
          </Main>
        )}
      </Page>
    </>
  );
};

export default SitesSettingsTags;
export { getServerSideProps };
