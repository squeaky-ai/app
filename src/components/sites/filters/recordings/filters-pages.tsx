import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Spinner } from 'components/spinner';
import { Checkbox } from 'components/checkbox';
import type { Site } from 'types/site';

interface Props {
  onClose: VoidFunction;
}

const QUERY = gql`
  query GetSitePages($siteId: ID!) {
    site(siteId: $siteId) {
      id
      pages
    }
  }
`;

const PagesSchema = Yup.object().shape({
  pages: Yup.array(),
});

export const FiltersPages: FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>('');

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const pages = data ? data.site.pages : [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  return (
    <Formik
      initialValues={{ pages: [] }}
      validationSchema={PagesSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log(values);
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
              <Input type='search' placeholder='Search...' onChange={handleSearch} />
              <i className='ri-search-line' /> 
            </div>
          </div>
          <div className='row pages'>
            {loading && <Spinner />}
            {pages.filter(l => l.toLowerCase().includes(search.toLowerCase())).map(page => (
              <Checkbox 
                key={page}
                name='page'
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
