import React from 'react';
import type { FC } from 'react';
import { Tabs } from 'components/tabs';
import { VisitorPages } from 'components/sites/visitors/visitors-pages';
import { VisitorsRecording } from 'components/sites/visitors/visitors-recordings';
import { VisitorsEvents } from 'components/sites/visitors/visitors-events';
import type { Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
}

export const VisitorsTabs: FC<Props> = ({ site, member }) => {
  return (
    <Tabs 
      tabs={[
        {
          name: 'Recordings',
          page: 'recordings',
          body: <VisitorsRecording site={site} member={member} />,
        },
        {
          name: 'Pages',
          page: 'pages',
          body: <VisitorPages site={site} />,
        },
        {
          name: 'Events',
          page: 'events',
          body: <VisitorsEvents site={site} member={member} />
        }
      ]}
    />
  )
};
