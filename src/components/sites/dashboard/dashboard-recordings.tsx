import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Pill } from 'components/pill';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { DashboardRecordingsChartTooltip } from 'components/sites/dashboard/dashboard-recordings-chart-tooltip';
import { DashboardChart } from 'components/sites/dashboard/dashboard-chart';
import { toTimeString } from 'lib/dates';
import { formatResultsForGroupType } from 'lib/charts-v2';
import type { AnalyticsRecording, Site } from 'types/graphql';
import type { Dashboard } from 'types/dashboard';
import type { TimePeriod } from 'types/common';

interface Props {
  site: Site;
  dashboard: Dashboard;
  period: TimePeriod;
}

export const DashboardRecordings: FC<Props> = ({ site, dashboard, period }) => {
  const hasRecordings = dashboard.recordingsCount.total > 0;

  const results = formatResultsForGroupType<AnalyticsRecording>(dashboard.recordings, period, { count: 0 }).map(d => ({
    dateKey: d.dateKey,
    count: d.count,
  }));

  return (
    <>
      <div className='heading'>
        <h5>
          <Icon name='group-line' />
          <Link href={`/sites/${site.id}/recordings`}>
            Recordings
          </Link>
        </h5>
      </div>
      {!hasRecordings && (
        <div className='dashboard-empty-state'>
          <Icon name='time-line' />
          <p>No data available</p>
        </div>
      )}
      {hasRecordings && (
        <>
          <DashboardChart>
            <ResponsiveContainer>
              <AreaChart data={results} margin={{ top: 1, left: 1, right: 1, bottom: 1 }}>
                {dashboard.recordings.items.map(count => (
                  <Area 
                    key={count.dateKey}
                    dataKey='count'
                    fillOpacity={1}
                    stroke='var(--blue-500)'
                    strokeWidth={2}
                    fill='var(--blue-50)'
                    type='monotone'
                  />
                ))}

                <Tooltip content={DashboardRecordingsChartTooltip} />
              </AreaChart>
            </ResponsiveContainer>
          </DashboardChart>
          <div className='heading'>
            <h3>{dashboard.recordingsCount.total.toLocaleString()}</h3>
            <Pill className='medium tertiary'>{(dashboard.recordingsCount.new).toLocaleString()} New</Pill>
            <Pill className='medium secondary'>{(dashboard.recordingsCount.total - dashboard.recordingsCount.new).toLocaleString()} Viewed</Pill>
          </div>
          <Label>Most eventful</Label>
          <TableWrapper>
            <Table>
              {dashboard.recordingsHighlights.eventful.map(recording => (
                <Row key={recording.id}>
                  <Cell>
                    <Icon name='play-mini-fill' />
                    <Link href={`/sites/${site.id}/recordings/${recording.id}`}>
                      {recording.sessionId}
                    </Link>
                  </Cell>
                <Cell>{recording.disconnectedAt.niceDateTime}</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
          <Label>Longest</Label>
          <TableWrapper>
            <Table>
              {dashboard.recordingsHighlights.longest.map(recording => (
                <Row key={recording.id}>
                  <Cell>
                    <Icon name='play-mini-fill' />
                    <Link href={`/sites/${site.id}/recordings/${recording.id}`}>
                      {recording.sessionId}
                    </Link>
                  </Cell>
                  <Cell>{toTimeString(recording.duration)}</Cell>
                </Row>
              ))}
            </Table>
          </TableWrapper>
        </>
      )}
    </>
  );
};
