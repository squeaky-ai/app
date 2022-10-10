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
      <Link href='/__admin/sites'>
        <a className={classnames('button', !bundled ? 'primary' : 'blank')}>
          All
        </a>
      </Link>

      <Link href='/__admin/sites/bundles'>
        <a className={classnames('button', bundled ? 'primary' : 'blank')}>
          Bundled
        </a>
      </Link>
    </ButtonGroup>
  );
};
