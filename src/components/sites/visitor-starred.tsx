import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Tooltip } from 'components/tooltip';
import { visitorStarred } from 'lib/api/graphql';
import type { Visitor, VisitorDetails } from 'types/visitor';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  visitor: Visitor | VisitorDetails;
}

export const VisitorStarred: FC<Props> = ({ site, visitor }) => {
  const starVisitor = async () => {
    await visitorStarred({
      siteId: site.id,
      visitorId: visitor.id,
      starred: !visitor.starred,
    });
  };

  return (
    <>
      <Tooltip
        button={
          <span onClick={starVisitor} className={classnames('visitor-starred', { active: visitor.starred })}>
            {visitor.starred ? <i className='star ri-star-fill' /> : <i className='star ri-star-line' />}
          </span>
        }
      >
        {visitor.starred ? 'Starred' : 'Not starred'}
      </Tooltip>
      {visitor.visitorId}
    </>
  );
};
