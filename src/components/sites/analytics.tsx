import React from 'react';
import type { FC } from 'react';
import { useAnalytics } from 'hooks/use-analytics';
import { AnalyticsBrowsers } from 'components/sites/analytics-browsers';
import { AnalyticsGraph } from 'components/sites/analytics-graph';
import { AnalyticsSessionDuration } from 'components/sites/analytics-session-duration';
import { AnalyticsPagesPerSession } from 'components/sites/analytics-pages-per-session';
import { AnalyticsLanguages } from 'components/sites/analytics-languages';
import { AnalyticsPages } from 'components/sites/analytics-pages';
import { AnalyticsDevices } from 'components/sites/analytics-devices';
import { Spinner } from 'components/spinner';
import { toMinutesAndSeconds, getDateRange } from 'lib/dates';
import type { TimePeriod } from 'lib/dates';

interface Props {
  period: TimePeriod;
}

export const Analytics: FC<Props> = ({ period }) => {
  const { analytics } = useAnalytics(getDateRange(period));

  const toTwoDecimalPlaces = (value: number) => {
    return Number(value.toFixed(2));
  };

  if (!analytics) {
    return <Spinner />;
  }

  return (
    <>
      <div className='analytics-grid'>
        <div className='card graph'>
          <AnalyticsGraph viewsAndVisitors={analytics.pageViewsRange} period={period} />
        </div>
        <div className='card visitors'>
          <h4>Visitors</h4>
          <h2>{analytics.visitors}</h2>
        </div>
        <div className='card views'>
          <h4>Page Views</h4>
          <h2>{analytics.pageViews}</h2>
        </div>
        <div className='card session-duration'>
          <h4>Average Session Duration</h4>
          <h2>{toMinutesAndSeconds(analytics.averageSessionDuration)}</h2>
          <AnalyticsSessionDuration />
        </div>
        <div className='card session-pages'>
          <h4>Pages Per Session</h4>
          <h2>{toTwoDecimalPlaces(analytics.pagesPerSession)}</h2>
          <AnalyticsPagesPerSession />
        </div>
        <div className='card basic page-browser'>
          <div className='grid'>
            <div className='card basic pages'>
              <h4>Pages</h4>
              <AnalyticsPages pages={analytics.pages} />
            </div>
            <div className='card basic browser'>
              <h4>Browser</h4>
              <div className='card'>
                <AnalyticsBrowsers browsers={analytics.browsers} />
              </div>
            </div>
          </div>
        </div>
        <div className='card basic meta'>
          <div className='card basic language'>
            <h4>Language</h4>
            <div className='card'>
              <AnalyticsLanguages languages={analytics.languages} />
            </div>
          </div>
          <div className='card basic devices'>
            <h4>Devices</h4>
            <AnalyticsDevices devices={analytics.devices} />
          </div>
          <div className='card viewport'>
            <h4>
              Screen Width
              <i className='ri-arrow-left-line' />
              <i className='ri-arrow-right-line' />
            </h4>
            <div className='items'>
              <div className='item'>
                <p>Largest</p>
                <h3>{analytics.dimensions.max}px</h3>
              </div>
              <div className='item'>
                <p>Average</p>
                <h3>{analytics.dimensions.avg}px</h3>
              </div>
              <div className='item'>
                <p>Smallest</p>
                <h3>{analytics.dimensions.min}px</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};