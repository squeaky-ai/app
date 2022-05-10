import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Spinner } from 'components/spinner';
import { Checkbox } from 'components/checkbox';
import { usePages } from 'hooks/use-pages';

interface Props {
  value: string[];
  onClose: VoidFunction;
  onUpdate: (value: string[]) => void;
}

const PagesSchema = Yup.object().shape({
  pages: Yup.array(),
});

export const FiltersPages: FC<Props> = ({ value, onClose, onUpdate }) => {
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
      initialValues={{ pages: value }}
      validationSchema={PagesSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.pages);
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
              <Checkbox 
                key={page}
                name='pages'
                onBlur={handleBlur}
                onChange={handleChange}
                value={page}
                checked={values.pages.includes(page)}
              >
                {page}
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
