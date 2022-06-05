import React from 'react';
import type { FC } from 'react';
import { Input } from 'components/input';
import { Tag } from 'components/tag';
import { Spinner } from 'components/spinner';
import { useEventGroups } from 'hooks/use-event-groups';
import { eventsGroupCreate } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  ids: string[];
  site: Site;
  onChange: (ids: string[]) => void;
}

export const EventGroupsSelector: FC<Props> = ({ ids, site, onChange }) => {
  const { groups, loading } = useEventGroups();

  const [value, setValue] =  React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleDelete = (id: string) => {
    onChange(ids.filter(i => i !== id));
  };

  const handleSelect = (id: string) => {
    onChange([...ids, id]);
    setValue('');
  };

  const handleCreate = async () => {
    const { id } = await eventsGroupCreate({ siteId: site.id, name: value });
    onChange([...ids, id]);
    setValue('');
  };

  const results = groups.filter(g => value 
    ? g.name.toLowerCase().includes(value.toLowerCase()) 
    : true
  );

  return (
    <div className='event-groups-selector'>
      <Input 
        type='text'
        value={value}
        placeholder='Add group...'
        onChange={handleChange}
      />

      {value && (
        <div className='typeahead'>
          <p className='small'>Select a group or create a new one</p>

          <div className='tags'>
            {loading && (
              <Spinner />
            )}

            {results.map(g => (
              <div key={g.id}>
                <Tag className='primary' onClick={() => handleSelect(g.id)}>
                  {g.name}
                </Tag>
              </div>
            ))}
          </div>

          <div className='create'>
            <p>Create:</p>
            <Tag className='secondary' onClick={handleCreate}>
              {value}
            </Tag>
          </div>
        </div>
      )}

      <div className='tags'>
        {ids.map(id => (
          <Tag className='primary' key={id} handleDelete={() => handleDelete(id)}>
            {groups.find(g => g.id === id)?.name}
          </Tag>
        ))}
      </div>
    </div>
  );
};
