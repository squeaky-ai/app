import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Highlighter } from 'components/highlighter';
import { Device } from 'components/device';
import { toNiceDate } from 'lib/dates';
import { visitorStarred } from 'lib/api/graphql';
import type { Site } from 'types/site';
import type { Visitor } from 'types/visitor';

interface Props {
  site: Site;
  query: string;
  visitor: Visitor;
}

export const VisitorsItem: FC<Props> = ({ site, visitor, query }) => {
  const router = useRouter();

  const viewVisitor = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const ignored = element.closest('button');

    if (ignored) {
      event.preventDefault();
    } else {
      router.push(`/sites/${router.query.site_id}/visitors/${visitor.visitorId}`);
    }
  };

  const starVisitor = async () => {
    await visitorStarred({
      siteId: site.id,
      visitorId: visitor.visitorId,
      starred: !visitor.starred,
    });
  };

  const toTimeStringDate = (value: string) => toNiceDate(Number(value));

  return (
    <tr 
      className='hover'
      role='link' 
      data-href={`/sites/${router.query.site_id}/visitors/${visitor.visitorId}`} 
      onClick={viewVisitor} 
      tabIndex={0}
    >
      <td className='no-overflow'>
        <Tooltip
          button={
            <span onClick={starVisitor} className={classnames('star', { active: visitor.starred })}>
              {visitor.starred ? <i className='ri-star-fill' /> : <i className='ri-star-line' />}
            </span>
          }
        >
          {visitor.starred ? 'Starred' : 'Not starred'}
        </Tooltip>
        {visitor.userId}
      </td>
      <td><a href='#'>{visitor.recordingCount}</a></td>
      <td>{toTimeStringDate(visitor.firstViewedAt)}</td>
      <td>{toTimeStringDate(visitor.lastActivityAt)}</td>
      <td>{visitor.language}</td>
      <td className="no-overflow">
        <Tooltip positionX='right' button={<Device deviceType={visitor.deviceType} />}>
          {visitor.deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
        </Tooltip>
        <Highlighter value={query}>{visitor.viewportX}</Highlighter> x <Highlighter value={query}>{visitor.viewportY}</Highlighter>
      </td>
      <td className='no-overflow'>
        <Tooltip positionX='right' button={<Browser name={visitor.browser} height={24} width={24} />}>
          {visitor.browserString}
        </Tooltip>
      </td>
      <td />
    </tr>
  )
};
