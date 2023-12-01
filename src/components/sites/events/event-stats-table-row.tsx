import React from 'react';
import type { FC } from 'react';
import { Row, Cell } from 'components/table';
import { EventSwatch } from 'components/sites/events/event-swatch';
import { EventStatsTag } from 'components/sites/events/event-stats-tag';
import type { EventsStat, StringRecord } from 'types/graphql';
import { toHoursMinutesAndSeconds } from 'lib/dates';
import { Browser } from 'components/browser';
import { Tooltip } from 'components/tooltip';
import { percentage } from 'lib/maths';

interface Props {
  position: number;
  stat: EventsStat;
  rowStyle: React.CSSProperties;
}

export const EventStatsTableRow: FC<Props> = ({ position, stat, rowStyle }) => {
  const getTopRecords = (records: StringRecord[], limit: number) => [...records]
    .sort((a, b) => Number(b.value) - Number(a.value))
    .slice(0, limit);

  const browsers = getTopRecords(stat.browsers, 5).map(record => ({
    ...record,
    percentage: percentage(stat.recordingsCount, Number(record.value)),
  }));

  const referrers = getTopRecords(stat.referrers, 10).map(record => ({
    ...record,
    percentage: percentage(stat.recordingsCount, Number(record.value)),
  }));

  return (
    <Row key={stat.eventOrGroupId} style={rowStyle}>
      <Cell>
        <EventSwatch index={position} />
        {stat.name}
      </Cell>
      <Cell>
        <EventStatsTag type={stat.type} />
      </Cell>
      <Cell>
        {stat.count.toLocaleString()}
      </Cell>
      <Cell>
        {stat.uniqueTriggers || '-'}
      </Cell>
      <Cell>
        {stat.averageEventsPerVisitor?.toFixed(2) || '-'}
      </Cell>
      <Cell>
        {stat.averageSessionDuration
          ? toHoursMinutesAndSeconds(stat.averageSessionDuration)
          : '-'
        }
      </Cell>
      <Cell>
        {stat.browsers.length === 0 && '-'}
        {stat.browsers.length > 0 && (
          <>
            <Tooltip
              portalClassName='event-stats-tooltip'
              button={
                <>
                  {browsers.map(record => (
                    <Browser
                      key={record.key}
                      name={record.key}
                      height={16}
                      width={16}
                    />
                  ))}
                </>
              }
            >
              <p><b>Top 5 Browsers</b></p>
              {browsers.map(record => (
                <p key={record.key}>
                  <span>{record.key}</span>
                  <span>{record.percentage}%</span>
                </p>
              ))}
            </Tooltip>
          </>
        )}
      </Cell>
      <Cell>
        {stat.referrers.length === 0 && '-'}
        {stat.referrers.length > 0 && (
          <Tooltip
            portalClassName='event-stats-tooltip'
            button={referrers.length}
            buttonClassName='link'
            positionX='right'
            fluid
          >
            <p><b>Top 10 Traffic Sources</b></p>
            {referrers.map(record => (
              <p key={record.key}>
                <span>{record.key}</span>
                <span>{record.percentage}%</span>
              </p>
            ))}
          </Tooltip>
        )}
      </Cell>
    </Row>
  );
};
