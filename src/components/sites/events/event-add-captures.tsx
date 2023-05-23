import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { uniqBy } from 'lodash';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Search } from 'components/search';
import { Checkbox } from 'components/checkbox';
import { Spinner } from 'components/spinner';
import { useEventCaptures } from 'hooks/use-event-captures';
import { EventsCaptureSort, EventsType } from 'types/graphql';
import type { EventsStat } from 'types/graphql';

interface Props {
  eventStats: EventsStat[];
  onClose: VoidFunction;
  onUpdate: (value: string[]) => void;
}

const CapturesSchema = Yup.object().shape({
  captures: Yup.array(),
});

export const EventAddCaptures: FC<Props> = ({ eventStats, onClose, onUpdate }) => {
  const [search, setSearch] = React.useState<string>('');

  // TODO: This will be a problem for people 
  // with many events
  const { events, loading } = useEventCaptures({ 
    page: 0, 
    size: 50, 
    sort: EventsCaptureSort.NameAsc,
    filters: { eventType: [], source: null },
  });

  const selected = eventStats.filter(s => s.type === EventsType.Capture).map(e => e.eventOrGroupId);

  const results = uniqBy(events.items, x => x.id)
    .filter(l => l.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.name.length - b.name.length);

  return (
    <div className='add-groups'>
      <Formik
        initialValues={{ captures: selected }}
        validationSchema={CapturesSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          onUpdate(values.captures);
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
              <div className='checkbox-group'>
                {results.map(capture => (
                  <Checkbox 
                    key={capture.id}
                    name='captures'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={capture.id}
                    checked={values.captures.includes(capture.id)}
                  >
                    {capture.name}
                  </Checkbox>
                ))}                
              </div>
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
