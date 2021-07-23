import React from 'react';
import type { FC } from 'react';
import { Main } from 'components/main';
import { useAnalytics } from 'hooks/analytics';
import { Spinner } from 'components/spinner';
import { toMinutesAndSeconds, daysBefore, toIsoDate } from 'lib/dates';
import { Select, Option } from 'components/select';

export const Analytics: FC = () => {
  const today = toIsoDate();

  const [date, setDate] = React.useState(today);
  const [loading, analytics] = useAnalytics(date);

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(event.target.value);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Main>
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
        </div>
        <div className='card session-pages'>
          <h4>Pages Per Session</h4>
          <h2>{analytics.pagesPerSession}</h2>
        </div>
        <div className='card basic page-browser'>
          <div className='grid'>
            <div className='card basic pages'>
              <h4>Pages</h4>
              <div className='table'>
                <table cellSpacing='0'>
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Views</th>
                      <th>Average time on page</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='card basic browser'>
              <h4>Browser</h4>
              <div className='card'>

              </div>
            </div>
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
                <p><b>Tablet</b></p>
                <h3>0 <span>0%</span></h3>
              </div>
            </div>
            <div className='card'>
              <i className='ri-smartphone-line' />
              <div className='stats'>
                <p><b>Mobile</b></p>
                <h3>0 <span>0%</span></h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};