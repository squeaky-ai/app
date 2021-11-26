import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import type { Site } from 'types/graphql';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  site: Site;
}

export const Avatar: FC<Props> = ({ className, site, ...rest }) => (
  <div className={classnames('avatar', className)} {...rest}>
    <span>{site.name[0]}</span>
  </div>  
);
