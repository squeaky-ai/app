import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Drawer } from 'components/drawer';
import { Container } from 'components/container';
import { Checkbox } from 'components/checkbox';
import { Table, Row, Cell } from 'components/table';
import { SettingsTag } from 'components/sites/settings-tag';
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

export const SettingsTags: FC = () => {
  const router = useRouter();
  const siteId = router.query.site_id;

  const { data } = useQuery<{ site: Site }>(QUERY, {
    variables: { siteId }
  });

  const tags = data ? data.site.tags : [];

  return (
    <Drawer title='Tags' name='tags'>
      <Container className='md'>
        <p>You can add tags to your recordings to better document and categorise your findings. The table below lists any tags you have already created. You can delete, merge or rename tags using the options in the table.</p>

        <Table className='tags-table'>
          <Row head>
            <Cell><Checkbox /></Cell>
            <Cell>Tag name</Cell>
            <Cell>Options</Cell>
          </Row>
          {tags.length === 0 && (
            <Row fluid>
              <p>There are currently no tags created for your site.</p>
            </Row>
          )}

          {tags.map(tag => (
            <SettingsTag key={tag.id} tag={tag} />
          ))}
        </Table>
      </Container>
    </Drawer>
  );
};
