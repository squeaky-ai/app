import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { ButtonGroup } from 'components/button-group';

export const UsersType: FC = () => {
  const router = useRouter();

  const parnered = router.pathname.endsWith('partners');

  return (
    <ButtonGroup className='users-types'>
      <Link href='/__admin/users' className={classnames('button', !parnered ? 'primary' : 'blank')}>
        All
      </Link>

      <Link href='/__admin/users/partners' className={classnames('button', parnered ? 'primary' : 'blank')}>
        Partners
      </Link>
    </ButtonGroup>
  );
};
