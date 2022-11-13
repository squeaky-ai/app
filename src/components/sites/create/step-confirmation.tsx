import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const StepConfirmation: FC<Props> = ({ site }) => (
  <div className='step step-confirmation'>
    <div className='verified'>
      <Icon name='checkbox-circle-line' />
      <h4>Your site has been verified</h4>
      <Link href={`/sites/${site.id}/dashboard`}>
        <a className='button primary'>
          Go To Site
        </a>
      </Link>
    </div>
  </div>
);
