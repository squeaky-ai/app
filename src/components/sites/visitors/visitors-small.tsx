import React from 'react';
import type { FC } from 'react';
import { VisitorsSmallItem } from 'components/sites/visitors/visitors-small-item';
import type { Site, Visitors } from 'types/graphql';

interface Props {
  site: Site;
  visitors: Visitors;
}

export const VisitorsSmall: FC<Props> = ({ site, visitors }) => (
  <div className='visitors-small'>
    {visitors.items.map(visitor => (
      <VisitorsSmallItem
        key={visitor.id} 
        site={site} 
        visitor={visitor} 
      />
    ))}
  </div>
);
