import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Illustration } from 'components/illustration';
import { Container } from 'components/container';

interface Props {
  className?: string;
}

export const NotFound: FC<Props> = ({ className }) => {
  React.useEffect(() => {
    // This is a hack, but the page component is out of scope
    document.querySelector('.page').classList.add('not-found');
  }, []);

  return (
    <div className={classnames('not-found', className)}>
      <Container className='md'>
        <Illustration illustration='illustration-10' height={256} width={256} alt='Page not found' />
        <h2>404</h2>
        <p>The page you are looking for cannot be found.</p>
        <Link href='/sites' className='button primary'>
          Back to sites
        </Link>
      </Container>
    </div>
  );
};
