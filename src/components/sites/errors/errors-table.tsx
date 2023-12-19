import React from 'react';
import type { FC } from 'react';
import { Sort } from 'components/sort';
import { TableWrapper, Table, Cell, Row } from 'components/table';
import { ErrorsTableRow } from 'components/sites/errors/errors-table-row';
import { ErrorsSort, Site } from 'types/graphql';
import type { ErrorsItem } from 'types/graphql';

interface Props {
  site: Site;
  errors: ErrorsItem[];
  sort: ErrorsSort;
  setSort: (sort: ErrorsSort) => void;
}

export const ErrorsTable: FC<Props> = ({ site, errors, sort, setSort }) => (
  <TableWrapper>
    <Table className='errors-table'>
      <Row className='head'>
        <Cell>Error</Cell>
        <Cell>
          Events
          <Sort 
            name='error_count' 
            order={sort} 
            onAsc={() => setSort(ErrorsSort.ErrorCountAsc)} 
            onDesc={() => setSort(ErrorsSort.ErrorCountDesc)} 
          />
        </Cell>
        <Cell>
          Sessions impacted
          <Sort 
            name='recording_count' 
            order={sort} 
            onAsc={() => setSort(ErrorsSort.RecordingCountAsc)} 
            onDesc={() => setSort(ErrorsSort.RecordingCountDesc)} 
          />
        </Cell>
        <Cell>
          Most recent occurence
          <Sort 
            name='timestamp' 
            order={sort} 
            onAsc={() => setSort(ErrorsSort.TimestampAsc)} 
            onDesc={() => setSort(ErrorsSort.TimestampDesc)} 
          />
        </Cell>
      </Row>
      {errors.map(error => (
        <ErrorsTableRow 
          key={error.id} 
          site={site}
          error={error} 
        />
      ))}
    </Table>
  </TableWrapper>
);
