import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Input } from 'components/input';
import { Spinner } from 'components/spinner';
import { Checkbox } from 'components/checkbox';
import type { Site } from 'types/site';

const QUERY = gql`
  query GetSiteLanguages($siteId: ID!) {
    site(siteId: $siteId) {
      id
      languages
    }
  }
`;

export const FiltersLanguage: FC = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string>('');

  const { data, loading } = useQuery<{ site: Site }>(QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  const languages = data ? data.site.languages : [];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  return (
    <form className='filters-language'>
      <div className='row'>
        <div className='search' role='search' aria-label='Filter recordings'>
          <Input type='search' placeholder='Search...' onChange={handleSearch} />
          <i className='ri-search-line' /> 
        </div>
      </div>
      <div className='row languages'>
        {loading && <Spinner />}
        {languages.filter(l => l.toLowerCase().includes(search.toLowerCase())).map(language => (
          <Checkbox key={language}>{language}</Checkbox>
        ))}
      </div>
    </form>
  );
};
