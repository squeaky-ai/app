import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { percentage } from 'lib/maths';
import { Button } from 'components/button';
import type { AnalyticsCountry } from 'types/graphql';

interface Props {
  countries: AnalyticsCountry[];
}

export const AnalyticsCountries: FC<Props> = ({ countries }) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const limit = 6;
  const total = sum(countries.map(b => b.count));
  const results = showAll ? countries : countries.slice(0, limit);

  return (
    <>
      <ul>
        {results.map((country, index) => (
          <li key={country.name}>
            <h2>{index + 1}</h2>
            <div className='details'>
              <p>{country.name}</p>
              <p className='count'>{percentage(total, country.count)}%</p>
            </div>
          </li>
        ))}
      </ul>
      
      {countries.length > limit && (
        <Button onClick={() => setShowAll(!showAll)} className='link show-all'>
          Show {showAll ? 'Less' : 'All'}
        </Button>
      )}
    </>
  );
};
