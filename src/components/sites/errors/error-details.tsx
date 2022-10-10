import React from 'react';
import type { FC } from 'react';
import { ErrorTabs } from 'components/sites/errors/error-tabs';
import { Card } from 'components/card';
import { ErrorRecordings } from 'components/sites/errors/error-recordings';
import { ErrorVisitors } from 'components/sites/errors/error-visitors';
import { ErrorCounts } from 'components/sites/errors/counts';
import { ErrorTab } from 'types/errors';
import type { Column, TimePeriod } from 'types/common';
import type { ErrorsDetails, ErrorsCounts, Site, Team } from 'types/graphql';

interface Props {
  tab: ErrorTab;
  site: Site;
  member: Team;
  details: ErrorsDetails;
  counts: ErrorsCounts;
  period: TimePeriod;
  visitorsColumns: Column[];
  recordingsColumns: Column[];
  recordingsSelected: string[];
  setTab: (tab: ErrorTab) => void;
  setRecordingsSelected: (selected: string[]) => void;
}

export const ErrorDetails: FC<Props> = ({ 
  tab,
  site,
  member, 
  counts, 
  period, 
  details, 
  visitorsColumns,
  recordingsColumns, 
  recordingsSelected,
  setTab,
  setRecordingsSelected,
}) => {
  return (
    <div className='error-details'>
      <ErrorCounts
        counts={counts}
        period={period} 
      />

      <ErrorTabs tab={tab} setTab={setTab} />

      {tab === ErrorTab.DETAILS && (
        <Card className='details'>
          <div>
            <p className='key'>Pages</p>
            <p className='value pages'>
              {details.pages.map(p => <span key={p}>{p}</span>)}
            </p>

            <p className='key'>Filename</p>
            <p className='value'>{details.filename}</p>

            <p className='key'>Line number</p>
            <p className='value'>{details.lineNumber}</p>

            <p className='key'>Column</p>
            <p className='value'>{details.colNumber}</p>

            <p className='key'>Message</p>
            <p className='value'>{details.message}</p>
          </div>
          <div>
            <p className='key'>Stacktrace</p>
            <pre className='code block'>
              <code>
                {details.stack || `To see stacktraces you must throw a JavaScript error and not a string.

// Good
throw new Error('My Error');

// Bad
throw 'My Error';

You can read more here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
`}
              </code>
            </pre>
          </div>
        </Card>
      )}

      {tab === ErrorTab.RECORDINGS && (
        <ErrorRecordings 
          id={details.id}
          site={site}
          member={member}
          period={period}
          columns={recordingsColumns}
          selected={recordingsSelected}
          setSelected={setRecordingsSelected}
        />
      )}

      {tab === ErrorTab.VISITORS && (
        <ErrorVisitors 
          id={details.id}
          site={site}
          member={member}
          period={period}
          columns={visitorsColumns}
        />
      )}
    </div>
  );
};
