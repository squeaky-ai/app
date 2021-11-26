import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { visitorStarred } from 'lib/api/graphql';
import type { Visitor } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  link?: boolean;
  visitor: Visitor;
}

export const VisitorsStarred: FC<Props> = ({ site, link, visitor }) => {
  const router = useRouter();

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
      {link
        ? <Link href={`/sites/${router.query.site_id}/visitors/${visitor.id}`}><a>{visitor.visitorId}</a></Link>
        :visitor.visitorId

      }
    </>
  );
};
