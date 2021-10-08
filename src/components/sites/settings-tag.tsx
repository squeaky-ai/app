import React from 'react';
import type { FC } from 'react';
import { Checkbox } from 'components/checkbox';
import { Row, Cell } from 'components/table';
import { Tag } from 'components/tag';
import { SettingsTagDelete } from './settings-tag-delete';
import { SettingsTagEdit } from './settings-tag-edit';
import type { Tag as ITag } from 'types/recording';

interface Props {
  tag: ITag;
  siteId: string;
}

export const SettingsTag: FC<Props> = ({ tag, siteId }) => {
  return (
    <Row key={tag.id}>
      <Cell>
        <Checkbox />
      </Cell>
      <Cell>
        <Tag>{tag.name}</Tag>
      </Cell>
      <Cell className='options'>
        <SettingsTagEdit tag={tag} siteId={siteId} />
        <SettingsTagDelete tag={tag} siteId={siteId} />
      </Cell>
    </Row>
  );
};
