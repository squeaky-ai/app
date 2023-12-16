import React from 'react';
import type { FC } from 'react';
import getConfig from 'next/config';
import type { DataExport, Site } from 'types/graphql';

interface Props {
  site: Site;
  dataExport: DataExport;
}

const { publicRuntimeConfig } = getConfig();

export const SettingsDataExportDownload: FC<Props> = ({ dataExport, site }) => {
  const downloadLink = `${publicRuntimeConfig.apiHost}/data_exports/${dataExport.id}?site_id=${site.id}`;

  return (
    <a className='button link primary' target='_blank' rel='noreferrer' href={downloadLink}>
      Download
    </a>
  );
};
