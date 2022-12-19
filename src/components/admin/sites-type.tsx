import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { ButtonGroup } from 'components/button-group';

export const SitesType: FC = () => {
  const router = useRouter();

  const bundled = router.pathname.endsWith('bundles');

  return (
    <ButtonGroup className='site-types'>
      <Link href='/__admin/sites' className={classnames('button', !bundled ? 'primary' : 'blank')}>
        All
      </Link>

      <Link href='/__admin/sites/bundles' className={classnames('button', bundled ? 'primary' : 'blank')}>
        Bundled
      </Link>
    </ButtonGroup>
  );
};
