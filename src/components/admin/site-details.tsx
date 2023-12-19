import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { SiteIngestEnabled } from 'components/admin/site-ingest-enabled';
import { SitePlanSettings } from 'components/admin/site-plan-settings';
import { SiteTeam } from 'components/admin/site-team';
import { Row, Table, Cell } from 'components/table';
import { Card } from 'components/card';
import type { ActiveVisitorCount, AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
  activeVisitors: ActiveVisitorCount[];
}

export const SiteDetails: FC<Props> = ({ activeVisitors, site }) => {
  const activeVisitorsCount = activeVisitors.find(a => a.siteId === site.uuid)?.count || 0;

  return (
    <div className='details'>
      <Card>
        <h5>
          <Icon name='window-line' />
          Site Details
        </h5>
        <div className='row'>
          <span>Site ID</span>
          <span>{site.id}</span>
        </div>
        <div className='row'>
          <span>Site Name</span>
          <span>{site.name}</span>
        </div>
        <div className='row'>
          <span>Date Created</span>
          <span>{site.createdAt.niceDateTime}</span>
        </div>
        <div className='row'>
          <span>Site Owner</span>
          <span>{site.ownerName || '-'}</span>
        </div>
        <div className='row'>
          <span>Site URL</span>
          <span>
            <Link href={site.url} target='_blank' rel='noreferrer'>{site.url}</Link>
          </span>
        </div>
        <div className='row'>
          <span>Tracking Code</span>
          <span>
            {site.verifiedAt 
              ? <Pill className='primary'>Verified</Pill> 
              : <Pill className='tertiary'>Unverified</Pill> 
            }
          </span>
        </div>
        <div className='row'>
          <span>Team count</span>
          <span>{site.team.length}</span>
        </div>
        <div className='row'>
          <span>Active Visitors</span>
          <span>{activeVisitorsCount}</span>
        </div>
        <div className='row'>
          <span>Superuser Access</span>
          <span>
            {site.superuserAccessEnabled 
              ? <Pill className='primary'>Yes</Pill> 
              : <Pill className='tertiary'>No</Pill> 
            }
          </span>
        </div>
        <div className='row'>
          <span>Provider</span>
          <span>{site.provider || '-'}</span>
        </div>
        <div className='row'>
          <span>API Key</span>
          <span>{site.apiKey || '-'}</span>
        </div>
        <div className='row'>
          <span>UUID</span>
          <span>{site.uuid || '-'}</span>
        </div>
        {site.providerAuth && (
          <div className='row'>
            <span>Publish History</span>
            <span>
              {site.providerAuth.publishHistory.length === 0
                ? '-'
                : site.providerAuth.publishHistory.join(', ')
              }
            </span>
          </div>
        )}
      </Card>

      <Card>
        <div className='recordings-counts'>
          <div className='title'>
            <h5>
              <Icon name='vidicon-line' />
              Sessions
            </h5>
            <SiteIngestEnabled site={site} />
          </div>
          <Table>
            <Row className='head'>
              <Cell />
              <Cell>All Time</Cell>
              <Cell>Current Month</Cell>
            </Row>
            <Row>
              <Cell>Total</Cell>
              <Cell>{site.recordingCounts.totalAll.toLocaleString()}</Cell>
              <Cell>{site.recordingCounts.totalCurrentMonth.toLocaleString()}</Cell>
            </Row>
            <Row>
              <Cell>Deleted</Cell>
              <Cell>{site.recordingCounts.deletedAll.toLocaleString()}</Cell>
              <Cell>{site.recordingCounts.deletedCurrentMonth.toLocaleString()}</Cell>
            </Row>
            <Row>
              <Cell>Analytics only</Cell>
              <Cell>-</Cell>
              <Cell>-</Cell>
            </Row>
          </Table>
        </div>
      </Card>

      <Card>
        <h5>
          <Icon name='settings-3-line' />
          Settings
        </h5>
        <SitePlanSettings site={site} />
      </Card>

      <Card>
        <h5>
          <Icon name='group-line' />
          Team
        </h5>
        <SiteTeam site={site} />
      </Card>
    </div>
  );
};
