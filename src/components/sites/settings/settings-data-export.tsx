import React from 'react';
import type { FC } from 'react';
import { Container } from 'components/container';
import { TableWrapper, Table, Row, Cell } from 'components/table';
import { SettingsDataExportModal } from 'components/sites/settings/settings-data-export-modal';
import { SettingsDataExportDelete } from 'components/sites/settings/settings-data-export-delete';
import { SettingsDataExportDownload } from 'components/sites/settings/settings-data-export-download';
import { DataExportTypes } from 'data/sites/enums';
import { Icon } from 'components/icon';
import { Sort } from 'components/sort';
import { toNiceDateWithoutTime } from 'lib/dates';
import { Spinner } from 'components/spinner';
import type { DataExport, Site } from 'types/graphql';

interface Props {
  site: Site;
  dataExport: DataExport[];
}

enum Order {
  ExportCreatedAsc = 'export_created__asc',
  ExportCreatedDesc = 'export_created__desc',
}

export const SettingsDataExport: FC<Props> = ({ site, dataExport }) => {
  const [sort, setSort] = React.useState<Order>(Order.ExportCreatedDesc);

  const results: DataExport[] = [...dataExport]
    .sort((a, b) => {
      switch(sort) {
        case Order.ExportCreatedAsc:
          return new Date(a.exportedAt.iso8601 || 0).valueOf() - new Date(b.exportedAt.iso8601 || 0).valueOf();
        case Order.ExportCreatedDesc:
          return new Date(b.exportedAt.iso8601 || 0).valueOf() - new Date(a.exportedAt.iso8601|| 0).valueOf();
      }
    })

  return (
    <>
      <Container className='md'>
        {dataExport.length === 0 && (
          <>
            <p>Us the button below to generate an export, once prepared it will be available for you in this tab.</p>
            <SettingsDataExportModal site={site} />
          </>
        )}
      </Container>

      {dataExport.length > 0 && (
        <TableWrapper>
          <Table className='data-exports-table'>
            <Row head>
              <Cell>Filename</Cell>
              <Cell>Type</Cell>
              <Cell>
                Export created
                <Sort
                  name='export_created' 
                  order={sort} 
                  onAsc={() => setSort(Order.ExportCreatedAsc)} 
                  onDesc={() => setSort(Order.ExportCreatedDesc)} 
                />
              </Cell>
              <Cell>Date range</Cell>
              <Cell>Options</Cell>
            </Row>

            {results.map(dataExport => (
              <Row key={dataExport.id}>
                <Cell>
                  {dataExport.exportedAt
                    ? dataExport.filename
                    : <i className='awaiting'>Awaiting download...</i>
                  }
                </Cell>
                <Cell>
                  {dataExport.exportType === DataExportTypes.Recordings && (
                    <><Icon className='export-type' name='vidicon-line' /> Recordings</>
                  )}
                  {dataExport.exportType === DataExportTypes.Visitors && (
                    <><Icon className='export-type' name='group-line' /> Visitors</>
                  )}
                </Cell>
                <Cell>
                  {dataExport.exportedAt
                    ? dataExport.exportedAt.niceDateTime
                    : <i className='awaiting'>Awaiting download...</i>
                  }
                </Cell>
                <Cell>
                  {toNiceDateWithoutTime(dataExport.startDate)} - {toNiceDateWithoutTime(dataExport.endDate)}
                </Cell>
                <Cell className='options'>
                  {dataExport.exportedAt && (
                    <>
                      <SettingsDataExportDownload site={site} dataExport={dataExport} />
                      <SettingsDataExportDelete site={site} dataExport={dataExport} />
                    </>
                  )}
                  {!dataExport.exportedAt && (
                    <span className='exporting'><Spinner /> Export being prepared</span>
                  )}
                </Cell>
              </Row>
            ))}
          </Table>
        </TableWrapper>
      )}
    </>
  );
};
