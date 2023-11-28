import { useRouter } from 'next/router';
import React from 'react';

type UseSiteId = [string | null, boolean];

export const useSiteId = (): UseSiteId => {
  const router = useRouter();
  const [siteId, setSiteId] = React.useState<string | null>(null);

  const { site_id } = router.query;

  const skip = !router.isReady || !siteId;

  React.useEffect(() => {
    if (router.isReady) {
      setSiteId(site_id as string);
    }
  }, [site_id, router.isReady]);

  return [siteId, skip];
};
