import React from 'react';
import type { FC } from 'react';
import { ErrorTabs } from 'components/sites/errors/error-tabs';
import { ErrorTab } from 'types/errors';
import { Card } from 'components/card';
import { ErrorRecordings } from 'components/sites/errors/error-recordings';
import { ErrorVisitors } from 'components/sites/errors/error-visitors';
import { ErrorCounts } from 'components/sites/errors/counts';
import type { TimePeriod } from 'types/common';
import type { ErrorsDetails, ErrorsCounts } from 'types/graphql';

interface Props {
  details: ErrorsDetails;
  counts: ErrorsCounts;
  period: TimePeriod;
}

export const ErrorDetails: FC<Props> = ({ counts, period, details }) => {
  const [tab, setTab] = React.useState<ErrorTab>(ErrorTab.DETAILS);

  return (
    <div className='error-details'>
      <ErrorCounts
        counts={counts}
        period={period} 
      />

      <ErrorTabs tab={tab} setTab={setTab} />

      {tab === ErrorTab.DETAILS && (
        <Card className='details'>
          <div className='left'>
            <p className='key'>Pages</p>
            <p className='value'>
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
          <div className='right'>
            <p className='key'>Stacktrace</p>
            <pre className='code block'>
              <code>
                {details.stack}
              </code>
            </pre>
          </div>
        </Card>
      )}

      {tab === ErrorTab.RECORDINGS && (
        <ErrorRecordings id={details.id} />
      )}

      {tab === ErrorTab.VISITORS && (
        <ErrorVisitors id={details.id} />
      )}
    </div>
  );
};
