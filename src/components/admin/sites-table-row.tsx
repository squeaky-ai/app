import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Cell, Row } from 'components/table';
import { Pill } from 'components/pill';
import { toNiceDate } from 'lib/dates';
import { Dropdown } from 'components/dropdown';
import { SitesDelete } from 'components/admin/sites-delete';
import type { AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
  activeVisitors: number;
  style?: React.CSSProperties;
}

export const SitesTableRow: FC<Props> = ({ site, activeVisitors, style }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row style={style}>
      <Cell>
        <Link href={`/sites/${site.id}/dashboard`}>
          <a target='_blank'>{site.id}</a>
        </Link>
      </Cell>
      <Cell>
        <Link href={`/__admin/sites/${site.id}`}>
          <a>
            {site.name}
          </a>
        </Link>
      </Cell>
      <Cell>
        <a href={site.url} target='_blank' rel='noreferrer'>
          {site.url}
        </a>
      </Cell>
      <Cell>{site.ownerName}</Cell>
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
      <Cell>{toNiceDate(site.createdAt)}</Cell>
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
