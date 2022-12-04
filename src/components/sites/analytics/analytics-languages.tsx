import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { percentage } from 'lib/maths';
import { Card } from 'components/card';
import { Table, Row, Cell } from 'components/table';
import { FiltersVisitorsLink } from 'components/sites/filters/common/filters-visitors-link';
import { FiltersRecordingsLink } from 'components/sites/filters/common/filters-recordings-link';
import { Sort } from 'components/sort';
import { Pagination } from 'components/pagination';
import type { AnalyticsLanguage } from 'types/graphql';

interface Props {
  languages: AnalyticsLanguage[];
}

export const AnalyticsLanguages: FC<Props> = ({ languages }) => {
  const [page, setPage] = React.useState<number>(0);
  const [sort, setSort] = React.useState<string>('visitors__desc');

  const limit = 10;
  const total = sum(languages.map(b => b.count));

  const results = [...languages]
    .slice(page * limit, page * limit + limit)
    .sort((a, b) => sort === 'visitors__asc'
      ? a.count - b.count
      : b.count - a.count
    );

  return (
    <>
      <Card>
        <Table>
          <Row head>
            <Cell>Language</Cell>
            <Cell>
              Visitors
              <Sort
                name='visitors'
                onAsc={() => setSort('visitors__asc')}
                onDesc={() => setSort('visitors__desc')}
                order={sort}
              />
            </Cell>
            <Cell />
          </Row>
          {results.map(language => (
            <Row key={language.name}>
              <Cell>
                {language.name}
              </Cell>
              <Cell>
                <b>{language.count.toLocaleString()}</b> {percentage(total, language.count)}%
              </Cell>
              <Cell className='filters-links'>
                <FiltersRecordingsLink 
                  action={{ languages: [language.name] }}
                  hint='View recordings that were in this language'
                />

                <FiltersVisitorsLink
                  action={{ languages: [language.name] }}
                  hint='View visitors that were in this language'
                />
              </Cell>
            </Row>
          ))}
        </Table>
      </Card>
      
      {languages.length > limit && (
        <Pagination
          currentPage={page + 1}
          pageSize={limit}
          total={languages.length}
          setPage={page => setPage(page - 1)}
          scrollToTop={false}
        />
      )}
    </>
  );
};
