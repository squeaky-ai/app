import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import type { Site } from 'types/site';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  site: Site;
}

export const Avatar: FC<Props> = React.memo(({ className, site, ...rest }) => {
  const [error, setError] = React.useState<boolean>(false);

  const onError = () => {
    if (!error) setError(true);
  };

  return (
    <div className={classnames('avatar', className)} {...rest}>
      {error
        ? <span>{site.name[0]}</span>
        : <img onError={onError} src={`${site.url}/favicon.ico`} />
      }
    </div>  
  );
});
