import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { Browser } from 'components/browser';
import { Highlighter } from 'components/highlighter';
import { toNiceDate } from 'lib/dates';
import type { Visitor } from 'types/visitor';

interface Props {
  query: string;
  visitor: Visitor;
}

export const VisitorsItem: FC<Props> = ({ visitor, query }) => {
  const router = useRouter();

  const viewVisitor = (event: React.MouseEvent) => {
    const element = event.target as HTMLElement;
    const ignored = element.closest('button');

    if (ignored) {
      event.preventDefault();
    } else {
      router.push(`/sites/${router.query.site_id}/visitors/${visitor.viewerId}`);
    }
  };

  const deviceIcon = (deviceType: string) => deviceType === 'Computer'
    ? 'ri-computer-line' 
    : 'ri-smartphone-line';

  const toTimeStringDate = (value: string) => toNiceDate(Number(value));

  return (
    <tr 
      className='hover'
      role='link' 
      data-href={`/sites/${router.query.site_id}/visitors/${visitor.viewerId}`} 
      onClick={viewVisitor} 
      tabIndex={0}
    >
      <td>{visitor.viewerId}</td>
      <td><a href='#'>{visitor.recordingCount}</a></td>
      <td>{toTimeStringDate(visitor.firstViewedAt)}</td>
      <td>{toTimeStringDate(visitor.lastActivityAt)}</td>
      <td>{visitor.language}</td>
      <td className="no-overflow">
        <Tooltip positionX='right' button={<i className={classnames('device', deviceIcon(visitor.deviceType))} />}>
          {visitor.deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
        </Tooltip>
        <Highlighter value={query}>{visitor.viewportX}</Highlighter> x <Highlighter value={query}>{visitor.viewportY}</Highlighter>
      </td>
      <td className='no-overflow'>
        <Tooltip positionX='right' button={<Browser name={visitor.browser} height={24} width={24} />}>
          {visitor.browserString}
        </Tooltip>
      </td>
    </tr>
  )
};
