import React from 'react';
import type { FC } from 'react';
import { sum } from 'lodash';
import { percentage } from 'lib/maths';
import { Flag } from 'components/flag';
import { Table, Row, Cell } from 'components/table';
import { ChartOptions } from 'components/sites/chart-options';
import { Pagination } from 'components/pagination';
import { AnalyticsWorldMap } from 'components/sites/analytics/analytics-world-map';
import { useChartSettings } from 'hooks/use-chart-settings';
import type { AnalyticsCountry } from 'types/graphql';

interface Props {
  countries: AnalyticsCountry[];
}

export const AnalyticsCountries: FC<Props> = ({ countries }) => {
  const [page, setPage] = React.useState<number>(0);

  const { scale, setScale } = useChartSettings('analytics-countries');

  const limit = 10;
  const total = sum(countries.map(b => b.count));

  const results = [...countries]
    .slice(page * limit, page * limit + limit)
    .sort((a, b) =>  b.count - a.count);

  return (
    <>
      <div className='chart-heading'>
        <h5>Country</h5>
        <ChartOptions
          scale={scale}
          setScale={setScale}
        />
      </div>
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
          {countries.length > limit && (
            <Pagination
              currentPage={page + 1}
              pageSize={limit}
              total={countries.length}
              setPage={page => setPage(page - 1)}
              scrollToTop={false}
            />
          )}
        </div>
        <div className='map'>
          <AnalyticsWorldMap 
            countries={countries} 
            scale={scale}
          />
        </div>
      </div>
    </>
  );
};
