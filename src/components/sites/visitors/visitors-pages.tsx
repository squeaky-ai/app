import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Sort } from 'components/sort';
import { Spinner } from 'components/spinner';
import { Error } from 'components/error';
import { Pagination } from 'components/pagination';
import { Table, Row, Cell } from 'components/table';
import { Illustration } from 'components/illustration';
import { toTimeString } from 'lib/dates';
import { useVisitorPages } from 'hooks/use-visitor-pages';
import { Site, VisitorsPagesSort } from 'types/graphql';

interface Props {
  site: Site;
}

export const VisitorPages: FC<Props> = ({ site }) => {
  const [page, setPage] = React.useState<number>(1);
  const [sort, setSort] = React.useState<VisitorsPagesSort>(VisitorsPagesSort.ViewsCountDesc);

  const { error, loading, pages } = useVisitorPages({
    page,
    sort,
  });

  const { items, pagination } = pages;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className='recordings-header'>
        <h4>Pages</h4>
      </div>

      {items.length === 0 && (
        <div className='no-visitor-recordings'>
          <Illustration illustration='illustration-1' height={160} width={320} />
          <h5>There are currently no pages for this visitor.</h5>
        </div>
      )}

      {items.length > 0 && (   
        <>
          <Table className='visitor-pages-table'>
            <Row head>
              <Cell>
                Page
              </Cell>
              <Cell>
                Views
                <Sort 
                  name='views_count' 
                  order={sort} 
                  onAsc={() => setSort(VisitorsPagesSort.ViewsCountAsc)} 
                  onDesc={() => setSort(VisitorsPagesSort.ViewsCountDesc)} 
                />
              </Cell>
              <Cell>
                Average time on page
                <Sort 
                  name='average_time_on_page' 
                  order={sort} 
                  onAsc={() => setSort(VisitorsPagesSort.AverageTimeOnPageAsc)} 
                  onDesc={() => setSort(VisitorsPagesSort.AverageTimeOnPageDesc)} 
                />
              </Cell>
            </Row>
            {items.map(item => (
              <Row key={item.pageView}>
                <Cell>
                  <Link href={`/sites/${site.id}/analytics/page/traffic?url=${encodeURIComponent(item.pageView)}`}>
                    {item.pageView}
                  </Link>
                </Cell>
                <Cell><b>{item.pageViewCount}</b></Cell>
                <Cell>{toTimeString(item.averageTimeOnPage)}</Cell>
              </Row>
            ))}
          </Table>

          <Pagination 
            currentPage={page} 
            pageSize={pagination.pageSize}
            total={pagination.total}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};
