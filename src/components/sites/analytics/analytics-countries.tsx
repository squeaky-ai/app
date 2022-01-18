import React from 'react';
import type { FC } from 'react';
import { orderBy } from 'lodash';
import { Flag } from 'components/flag';
import { Table, Row, Cell } from 'components/table';
import type { SitesCountry } from 'types/graphql';

interface Props {
  countries: SitesCountry[];
}

export const AnalyticsCountries: FC<Props> = ({ countries }) => {
  const ordered = orderBy(countries, 'count', 'desc');

  return (
    <Table>
      <Row head>
        <Cell>Country</Cell>
        <Cell>Number of visits</Cell>
      </Row>
      {ordered.map(country => (
        <Row key={country.code}>
          <Cell>
            <Flag code={country.code} />
            {country.name}
          </Cell>
          <Cell><b>{country.count}</b></Cell>
        </Row>
      ))}
    </Table>
  );
};
