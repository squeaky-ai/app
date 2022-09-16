import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Checkbox } from 'components/checkbox';
import { Icon } from 'components/icon';
import { Spinner } from 'components/spinner';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { useReferrers } from 'hooks/use-referrers';
import type { RecordingsFilters } from 'types/graphql';
import type { VisitorsFilters } from 'types/visitors';
import type { ValueOf } from 'types/common';

interface Props {
  value: RecordingsFilters['referrers'];
  onClose: VoidFunction;
  onUpdate: (value: ValueOf<RecordingsFilters | VisitorsFilters>) => void;
}

const ReferrersSchema = Yup.object().shape({
  referrers: Yup.array(),
});

export const FiltersReferrers: FC<Props> = ({ value, onClose, onUpdate }) => {
  const [search, setSearch] = React.useState<string>('');

  const { referrers, loading } = useReferrers();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const results = referrers
    .filter(l => l.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.length - b.length);

  return (
    <Formik
      initialValues={{ referrers: value }}
      validationSchema={ReferrersSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.referrers);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-referrers' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='search' role='search' aria-label='Filter recordings'>
              <Input
                type='search' 
                placeholder='Search...' 
                autoComplete='off'
                onChange={handleSearch} 
              />
              <Icon name='search-line' /> 
            </div>
          </div>
          <div className='row referrers'>
            {loading && <Spinner />}

            <Checkbox 
              name='referrers'
              onBlur={handleBlur}
              onChange={handleChange}
              value='none'
              checked={values.referrers.includes('none')}
            >
              Direct (none)
            </Checkbox>

            {results.map(referrer => (
              <Checkbox 
                key={referrer}
                name='referrers'
                onBlur={handleBlur}
                onChange={handleChange}
                value={referrer}
                checked={values.referrers.includes(referrer)}
              >
                {referrer}
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
  );
};
