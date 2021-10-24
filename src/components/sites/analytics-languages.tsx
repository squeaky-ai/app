import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { percentage } from 'lib/maths';
import { Button } from 'components/button';
import type { AnalyticsLanguage } from 'types/analytics';

interface Props {
  languages: AnalyticsLanguage[];
}

export const AnalyticsLanguages: FC<Props> = ({ languages }) => {
  const [showAll, setShowAll] = React.useState<boolean>(false);

  const limit = 6;
  const total = sum(languages.map(b => b.count));
  const results = showAll ? languages : languages.slice(0, limit);

  return (
    <>
      <ul>
        {results.map((language, index) => (
          <li key={language.name}>
            <h2>{index + 1}</h2>
            <div className='details'>
              <p>{language.name}</p>
              <p className='count'>{percentage(total, language.count)}%</p>
            </div>
          </li>
        ))}
      </ul>
      
      {languages.length > limit && (
        <Button onClick={() => setShowAll(!showAll)} className='link show-all'>
          Show {showAll ? 'Less' : 'All'}
        </Button>
      )}
    </>
  );
};
