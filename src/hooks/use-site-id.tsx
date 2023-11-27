import { useRouter } from 'next/router';
import React from 'react';

export const useSiteId = (): string | null => {
  const router = useRouter();
  const [siteId, setSiteId] = React.useState<string | null>(null);

  const { site_id } = router.query;

  React.useEffect(() => {
    if (router.isReady) {
      setSiteId(site_id as string);
    }
  }, [site_id, router.isReady]);

  return siteId;
};
