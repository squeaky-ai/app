import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Spinner } from 'components/spinner';
import { Radio } from 'components/radio';
import { usePages } from 'hooks/use-pages';

interface Props {
  value: string | null;
  onClose: VoidFunction;
  onUpdate: (value: string) => void;
}

const PageSchema = Yup.object().shape({
  page: Yup.string(),
});

export const FiltersPage: FC<Props> = ({ value, onClose, onUpdate }) => {
  const [search, setSearch] = React.useState<string>('');
  const { pages, loading } = usePages();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const results = pages
    .filter(l => l.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.length - b.length);

  return (
    <Formik
      initialValues={{ page: value }}
      validationSchema={PageSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.page);
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
            <div className='search' role='search' aria-label='Filter recordings'>
              <Input 
                type='search'
                placeholder='Search...' 
                onChange={handleSearch} 
                autoComplete='off'
              />
              <Icon name='search-line' /> 
            </div>
          </div>
          <div className='row pages'>
            {loading && <Spinner />}
            {results.map(page => (
              <Radio 
                key={page}
                name='page'
                onBlur={handleBlur}
                onChange={handleChange}
                value={page}
                checked={values.page === page}
              >
                {page}
              </Radio>
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
