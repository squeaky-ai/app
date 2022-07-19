import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Pill } from 'components/pill';
import { Divider } from 'components/divider';
import { SiteEnterpriseSettings } from 'components/admin/site-enterprise-settings';
import { toNiceDate } from 'lib/dates';
import type { ActiveVisitorCount, AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
  activeVisitors: ActiveVisitorCount[];
  isEnterprise: boolean;
}

export const SiteDetails: FC<Props> = ({ activeVisitors, site, isEnterprise }) => {
  const activeVisitorsCount = activeVisitors.find(a => a.siteId === site.uuid)?.count || 0;

  return (
    <div className='details'>
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
        <span>{toNiceDate(site.createdAt)}</span>
      </div>
      <div className='row'>
        <span>Site Owner</span>
        <span>{site.ownerName}</span>
      </div>
      <div className='row'>
        <span>Site URL</span>
        <span>
          <a href={site.url} target='_blank' rel='noreferrer'>{site.url}</a>
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

      <Divider />

      <h5>
        <Icon name='vidicon-line' />
        Recordings
      </h5>

      <div className='row'>
        <span>Total <i>(all time)</i></span>
        <span>{site.recordingCounts.totalAll}</span>
      </div>
      <div className='row'>
        <span>Locked <i>(all time)</i></span>
        <span>{site.recordingCounts.lockedAll}</span>
      </div>
      <div className='row'>
        <span>Deleted <i>(all time)</i></span>
        <span>{site.recordingCounts.deletedAll}</span>
      </div>
      <div className='row'>
        <span>Total <i>(current month)</i></span>
        <span>{site.recordingCounts.totalCurrentMonth}</span>
      </div>
      <div className='row'>
        <span>Locked <i>(current month)</i></span>
        <span>{site.recordingCounts.lockedCurrentMonth}</span>
      </div>
      <div className='row'>
        <span>Deleted <i>(current month)</i></span>
        <span>{site.recordingCounts.deletedCurrentMonth}</span>
      </div>

      {isEnterprise && (
        <>
          <Divider />
          <h5>
            <Icon name='building-line' />
            Enterprise Settings
          </h5>
          <SiteEnterpriseSettings site={site} />
        </>
      )}
    </div>
  );
};
