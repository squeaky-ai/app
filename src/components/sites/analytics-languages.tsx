import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import type { AnalyticsLanguage } from 'types/analytics';

interface Props {
  languages: AnalyticsLanguage[];
}

export const AnalyticsLanguages: FC<Props> = ({ languages }) => {
  const total = sum(languages.map(b => b.count));

  const percentage = (count: number) => Math.round((count / total) * 100);

  return (
    <ul>
      {languages.map((language, index) => (
        <li key={language.name}>
          <h2>{index + 1}</h2>
          <div className='details'>
            <p>{language.name}</p>
            <p className='count'>{percentage(language.count)}%</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
