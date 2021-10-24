import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { percentage } from 'lib/maths';
import type { AnalyticsLanguage } from 'types/analytics';

interface Props {
  languages: AnalyticsLanguage[];
}

export const AnalyticsLanguages: FC<Props> = ({ languages }) => {
  const total = sum(languages.map(b => b.count));

  return (
    <ul>
      {languages.map((language, index) => (
        <li key={language.name}>
          <h2>{index + 1}</h2>
          <div className='details'>
            <p>{language.name}</p>
            <p className='count'>{percentage(total, language.count)}%</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
