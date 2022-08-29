import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Search } from 'components/search';
import { Checkbox } from 'components/checkbox';
import { Spinner } from 'components/spinner';
import { useEventGroups } from 'hooks/use-event-groups-names';
import { EventsStat, EventsType } from 'types/graphql';

interface Props {
  eventStats: EventsStat[];
  onClose: VoidFunction;
  onUpdate: (value: string[]) => void;
}

const GroupsSchema = Yup.object().shape({
  groups: Yup.array(),
});

export const EventAddGroups: FC<Props> = ({ eventStats, onClose, onUpdate }) => {
  const [search, setSearch] = React.useState<string>('');

  const { groups, loading } = useEventGroups();

  const selected = eventStats.filter(s => s.type === EventsType.Group).map(e => e.eventOrGroupId);

  const results = groups
    .filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.length - b.name.length);

  return (
    <div className='add-groups'>
      <Formik
        initialValues={{ groups: selected }}
        validationSchema={GroupsSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onUpdate(values.groups);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          values,
        }) => (
          <form className='filters-pages' onSubmit={handleSubmit}>
            <div className='row'>
              <Search search={search} onSearch={setSearch} />
            </div>
            <div className='row pages'>
              {loading && <Spinner />}
              {results.map(group => (
                <Checkbox 
                  key={group.id}
                  name='groups'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={group.id}
                  checked={values.groups.includes(group.id)}
                >
                  {group.name}
                </Checkbox>
              ))}
            </div>

            <div className='actions'>
              <Button type='submit' disabled={isSubmitting} className='primary'>Apply</Button>
              <Button type='button' className='quaternary' onClick={onClose}>Cancel</Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
};
