import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { percentage } from 'lib/maths';
import { Flag } from 'components/flag';
import { Table, Row, Cell } from 'components/table';
import { Pagination } from 'components/pagination';
import type { AnalyticsCountry } from 'types/graphql';
import { AnalyticsWorldMap } from './analytics-world-map';

interface Props {
  countries: AnalyticsCountry[];
}

export const AnalyticsCountries: FC<Props> = ({ countries }) => {
  const [page, setPage] = React.useState<number>(0);

  const limit = 10;
  const total = sum(countries.map(b => b.count));

  const results = [...countries]
    .slice(page * limit, page * limit + limit)
    .sort((a, b) =>  b.count - a.count);

  return (
    <>
      <h5>Country</h5>
      <div className='country-map'>
        <div className='list'>
          <Table>
            {results.map(country => (
              <Row key={country.name}>
                <Cell>
                  <Flag code={country.code} />
                  {country.name}
                </Cell>
                <Cell>
                  {percentage(total, country.count)}%
                </Cell>
              </Row>
            ))}
          </Table>
        </div>
        <div className='map'>
          <AnalyticsWorldMap countries={countries} />
        </div>
      </div>

      {countries.length > limit && (
        <Pagination
          currentPage={page + 1}
          pageSize={limit}
          total={countries.length}
          setPage={page => setPage(page - 1)}
          scrollToTop={false}
        />
      )}
    </>
  );
};
