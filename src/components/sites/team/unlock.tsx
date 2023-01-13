import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const Unlock: FC<Props> = ({ site }) => (
  <div className='unlock'>
    <Icon name='error-warning-line' />
    <p>The {site.plan.name} plan has a limit of <b>{site.plan.teamMemberLimit}</b> team members. <Link href={`/sites/${site.id}/settings/subscription`}>Upgrade</Link> to invite more.</p>
    <Link href={`/sites/${site.id}/settings/subscription`} className='button'>
      Upgrade Now
    </Link>
  </div>
);
