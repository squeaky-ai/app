import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';
import { visitorStarred } from 'lib/api/graphql';
import { Highlighter } from 'components/highlighter';
import type { Visitor } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  link?: boolean;
  highlight?: boolean;
  search?: string;
  visitor: Visitor;
}

export const VisitorsStarred: FC<Props> = ({ site, search, link, highlight, visitor }) => {
  const router = useRouter();

  const starVisitor = async () => {
    await visitorStarred({
      siteId: site.id,
      visitorId: visitor.id,
      starred: !visitor.starred,
    });
  };

  const visitorId = highlight
    ? <Highlighter value={search}>{visitor.visitorId}</Highlighter>
    : visitor.visitorId

  return (
    <>
      <Tooltip
        button={
          <span onClick={starVisitor} className={classnames('visitor-starred', { active: visitor.starred })}>
            {visitor.starred ? <Icon className='star' name='star-fill' /> : <Icon className='star' name='star-line' />}
          </span>
        }
      >
        {visitor.starred ? 'Starred' : 'Not starred'}
      </Tooltip>
      {link
        ? <Link href={`/sites/${router.query.site_id}/visitors/${visitor.id}`}><a>{visitorId}</a></Link>
        : visitorId
      }
    </>
  );
};
