import React from 'react';
import type { FC } from 'react';
import { Checkbox } from 'components/checkbox';
import { Row, Cell } from 'components/table';
import { Tag } from 'components/tag';
import { SettingsTagDelete } from 'components/sites/settings/settings-tag-delete';
import { SettingsTagEdit } from 'components/sites/settings/settings-tag-edit';
import type { Tag as ITag } from 'types/graphql';

interface Props {
  tag: ITag;
  siteId: string;
  selected: string[];
  setSelected: (selected: string[]) => void;
}

export const SettingsTag: FC<Props> = ({ tag, siteId, selected, setSelected }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSelected([...selected, tag.id])
      : setSelected(selected.filter(s => s !== tag.id ));
  };

  return (
    <Row key={tag.id}>
      <Cell>
        <Checkbox 
          checked={selected.includes(tag.id)}
          onChange={handleChange}
        />
      </Cell>
      <Cell>
        <Tag className='primary'>{tag.name}</Tag>
      </Cell>
      <Cell className='options'>
        <SettingsTagEdit tag={tag} siteId={siteId} />
        <SettingsTagDelete tag={tag} siteId={siteId} />
      </Cell>
    </Row>
  );
};
