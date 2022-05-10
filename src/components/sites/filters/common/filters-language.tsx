import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Spinner } from 'components/spinner';
import { Checkbox } from 'components/checkbox';
import type { Site } from 'types/graphql';

interface Props {
  value: string[];
  onClose: VoidFunction;
  onUpdate: (value: string[]) => void;
}

const QUERY = gql`
  query GetSiteLanguages($siteId: ID!) {
    site(siteId: $siteId) {
      id
      languages
    }
  }
`;

const LanguagesSchema = Yup.object().shape({
  locales: Yup.array(),
});

export const FiltersLanguage: FC<Props> = ({ value, onClose, onUpdate }) => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>('');

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const languages = data ? data.site.languages : [];

  const results = languages
    .filter(l => l.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <Formik
      initialValues={{ locales: value }}
      validationSchema={LanguagesSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onUpdate(values.locales);
      }}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        values,
      }) => (
        <form className='filters-language' onSubmit={handleSubmit}>
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
          <div className='row languages'>
            {loading && <Spinner />}
            {results.map((language) => (
              <Checkbox 
                key={language}
                name='locales'
                onBlur={handleBlur}
                onChange={handleChange}
                value={language}
                checked={values.locales.includes(language)}
              >
                {language}
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
