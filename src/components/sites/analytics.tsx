import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { useAnalytics } from 'hooks/analytics';
import { AnalyticsBrowsers } from 'components/sites/analytics-browsers';
import { AnalyticsGraph } from 'components/sites/analytics-graph';
import { AnalyticsSessionDuration } from 'components/sites/analytics-session-duration';
import { AnalyticsPagesPerSession } from 'components/sites/analytics-pages-per-session';
import { AnalyticsPages } from 'components/sites/analytics-pages';
import { Spinner } from 'components/spinner';
import { toMinutesAndSeconds, daysBefore, toIsoDate } from 'lib/dates';
import { BreadCrumbs } from 'components/sites/breadcrumbs';
import { Select, Option } from 'components/select';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

export const Analytics: FC<Props> = ({ site }) => {
  const today = toIsoDate();

  const [date, setDate] = React.useState(today);
  const [loading, analytics] = useAnalytics(date);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
  };

  const toTwoDecimalPlaces = (value: number) => {
    return Number(value.toFixed(2));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Main>
      <BreadCrumbs site={site} page='Analytics' />

      <div className='heading'>
        <h3 className='title'>Analytics</h3>
        <div className='period'>
          <p><b>Period:</b></p>
          <Select onChange={handleDateChange} value={date}>
            <Option value={today}>Today</Option>
            {daysBefore().map(date => (
              <Option value={toIsoDate(date)} key={date.valueOf()}>
                {toIsoDate(date)}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className='analytics-grid'>
        <div className='card graph'>
          <AnalyticsGraph viewsAndVisitors={analytics.viewsAndVisitorsPerHour} />
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
              <ul>
                <li>
                  <h2>1</h2>
                  <div className='details'>
                    <p>English (GB)</p>
                    <p className='count'>32.00%</p>
                  </div>
                </li>
                <li>
                  <h2>2</h2>
                  <div className='details'>
                    <p>English (US)</p>
                    <p className='count'>32.00%</p>
                  </div>
                </li>
                <li>
                  <h2>3</h2>
                  <div className='details'>
                    <p>Italian (IT)</p>
                    <p className='count'>32.00%</p>
                  </div>
                </li>
                <li>
                  <h2>4</h2>
                  <div className='details'>
                    <p>German (DE)</p>
                    <p className='count'>32.00%</p>
                  </div>
                </li>
                <li>
                  <h2>5</h2>
                  <div className='details'>
                    <p>Spanish (ES)</p>
                    <p className='count'>32.00%</p>
                  </div>
                </li>
                <li>
                  <h2>6</h2>
                  <div className='details'>
                    <p>Spanish (US)</p>
                    <p className='count'>32.00%</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='card basic devices'>
            <h4>Devices</h4>
            <div className='grid'>
              <div className='card'>
                <i className='ri-computer-line' />
                <div className='stats'>
                  <p><b>Desktop / Laptop</b></p>
                  <h3>0 <span>0%</span></h3>
                </div>
              </div>
              <div className='card'>
                <i className='ri-tablet-line' />
                <div className='stats'>
                  <p><b>Tablet / Mobile</b></p>
                  <h3>0 <span>0%</span></h3>
                </div>
              </div>
            </div>
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
                <h3>3600px</h3>
              </div>
              <div className='item'>
                <p>Average</p>
                <h3>1523px</h3>
              </div>
              <div className='item'>
                <p>Smallest</p>
                <h3>270px</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};