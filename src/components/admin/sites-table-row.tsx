import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { Dropdown } from 'components/dropdown';
import { SitesDelete } from 'components/admin/sites-delete';
import { getRemainingTrialDays } from 'lib/plan';
import { OWNER } from 'data/teams/constants';
import type { AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
  activeVisitors: number;
  style?: React.CSSProperties;
}

const DATE_WE_STARTED_DOING_TRIALS = new Date(2023, 4, 30, 0, 0, 0, 0);

export const SitesTableRow: FC<Props> = ({ site, activeVisitors, style }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const trialDaysRemaining = getRemainingTrialDays(site, OWNER);

  const trialStatus = (() => {
    if (new Date(site.createdAt.iso8601).valueOf() < DATE_WE_STARTED_DOING_TRIALS.valueOf()) {
      return 'No Trial'
    }

    if (trialDaysRemaining === 0) {
      return 'Less than 24 hours remaining';
    }

    if (trialDaysRemaining) {
      return `${trialDaysRemaining} days remaining`;
    }

    return 'Trial complete';
  })();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row style={style}>
      <Cell>
        <Link href={`/sites/${site.id}/dashboard`} target='_blank'>
          {site.id}
        </Link>
      </Cell>
      <Cell>
        <Link href={`/__admin/sites/${site.id}`}>
          {site.name}
        </Link>
        {site.bundled && (
          <span className='bundled'>
            <Icon name='bubble-chart-line' />
          </span>
        )}
      </Cell>
      <Cell>
        <a href={site.url} target='_blank' rel='noreferrer'>
          {site.url}
        </a>
      </Cell>
      <Cell>{site.ownerName || '-'}</Cell>
      <Cell>{site.plan.name}</Cell>
      <Cell>
        {site.plan.exceeded 
          ? <Pill className='tertiary'>Yes</Pill> 
          : <Pill className='secondary'>No</Pill>
        }
      </Cell>
      <Cell>
        {site.verifiedAt 
          ? <Pill className='primary'>Verified</Pill> 
          : <Pill className='tertiary'>Unverified</Pill> 
        }
      </Cell>
      <Cell>{site.team.length}</Cell>
      <Cell>{site.provider || '-'}</Cell>
      <Cell>{trialStatus}</Cell>
      <Cell>{site.createdAt.niceDateTime}</Cell>
      <Cell>{activeVisitors}</Cell>
      <Cell>
        {site.superuserAccessEnabled 
          ? <Pill className='primary'>Yes</Pill> 
          : <Pill className='tertiary'>No</Pill> 
        }
      </Cell>
      <Cell>
          <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
            <SitesDelete 
              site={site} 
              onClose={onRowActionClose}
            />
          </Dropdown>
        </Cell>
    </Row>
  );
};
