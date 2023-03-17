import React from 'react';
import type { FC } from 'react';
import type { DataExport, Site } from 'types/graphql';
import { Button } from 'components/button';

interface Props {
  site: Site;
  dataExport: DataExport;
}

export const SettingsDataExportDownload: FC<Props> = () => (
  <Button className='link primary'>Download</Button>
);
