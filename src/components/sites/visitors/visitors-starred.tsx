import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tooltip } from 'components/tooltip';
import { visitorStarred } from 'lib/api/graphql';
import { Highlighter } from 'components/highlighter';
import { READ_ONLY, SUPER_USER } from 'data/teams/constants';
import type { Team, Visitor } from 'types/graphql';
import type { Site } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  site: Site;
  member?: Team;
  link?: boolean;
  highlight?: boolean;
  search?: string;
  visitor: Visitor;
}

export const VisitorsStarred: FC<Props> = ({ site, member, search, link, highlight, visitor }) => {
  const siteId = useSiteId();

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
        buttonProps={{ unauthorized: [READ_ONLY, SUPER_USER].includes(member?.role) }}
      >
        {visitor.starred ? 'Starred' : 'Not starred'}
      </Tooltip>
      {link
        ? <Link href={`/sites/${siteId}/visitors/${visitor.id}`}>{visitorId}</Link>
        : visitorId
      }
    </>
  );
};
