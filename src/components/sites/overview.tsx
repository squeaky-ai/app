import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card } from 'components/card';

export const Overview: FC = () => {
  const router = useRouter();

  const { site_id } = router.query;

  return (
    <div className='overview-grid'>
      <Card className='visitors'>
        <h3 className='sub-heading'>
          <i className='ri-group-line' />
          Visitors
        </h3>
        <h2>0</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/visitors`}>
            <a>View All</a>
          </Link>
          <i className='ri-arrow-right-line' />
        </div>
      </Card>

      <Card className='recordings'>
        <h3 className='sub-heading'>
          <i className='ri-vidicon-line' />
          Recordings
        </h3>
        <h2>0</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/recordings`}>
            <a>View All</a>
          </Link>
          <i className='ri-arrow-right-line' />
        </div>
      </Card>

      <Card className='pageviews'>
        <h3 className='sub-heading'>
          <i className='ri-pages-line' />
          Page Views
        </h3>
        <h2>0</h2>
        <div className='link'>
          <Link href={`/sites/${site_id}/analytics`}>
            <a>Analytics</a>
          </Link>
          <i className='ri-arrow-right-line' />
        </div>
      </Card>

      <Card className='latest-recording'>
        <h3 className='sub-heading'>
          Latest Recording
        </h3>
      </Card>

      <Card className='latest-notes'>
        <h3 className='sub-heading'>
          <i className='ri-sticky-note-line' />
          Latest Notes
        </h3>
      </Card>
    </div>
  );
};
