import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hideShowExtra?: boolean;
}

export const Spinner: FC<Props> = ({ hideShowExtra, className, ...rest }) => {
  let timeout: NodeJS.Timeout;

  const [showExtra, setShowExtra] = React.useState<boolean>(false);

  React.useEffect(() => {
    timeout = setTimeout(() => {
      setShowExtra(hideShowExtra ? false : true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={classnames('spinner', className)} {...rest}>
      <div className='icon'>
        <i className='ri-loader-4-line' />
      </div>
      {showExtra && <p>Still working on it...</p>}
    </div>
  );
};
