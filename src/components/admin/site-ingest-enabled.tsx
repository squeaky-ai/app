import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { useToasts } from 'hooks/use-toasts';
import { adminSiteIngestUpdate } from 'lib/api/graphql';
import type { AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
}

export const SiteIngestEnabled: FC<Props> = ({ site }) => {
  const toasts = useToasts();

  const handleClick = async () => {
    try {
       await adminSiteIngestUpdate({ siteId: site.id, enabled: !site.ingestEnabled });
       toasts.add({ type: 'success', body: 'Site ingest updated' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to update site ingest' });
    }
  };

  return (
    <Button className='tertiary' onClick={handleClick}>
      {site.ingestEnabled ? 'Disable' : 'Enable'} Ingest
    </Button>
  )
};
