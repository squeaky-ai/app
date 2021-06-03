import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import SqueakyPage from 'components/SqueakyPage';
import { SiteHeader } from 'components/SiteHeader';
import Wrapper from 'components/Wrapper';
import { useSqueaky } from 'components/SqueakyProvider';
import { useRouter } from 'next/router';

const SitesAnalytics: NextPage = () => {
  const api = useSqueaky();
  const router = useRouter();

  const [site, setSite] = React.useState(null);

  const getSite = async () => {
    // TODO: Why is query empty sometimes?
    const { site } = await api.getSite(router.query.site_id as string || '');
    setSite(site);
  };

  useEffect(() => { getSite() }, []);

  return (
    <SqueakyPage>
      <Wrapper size='lg'>
        {site && (
          <>
            <SiteHeader site={site} />
          </>
        )}
      </Wrapper>
    </SqueakyPage>
  );
};

export default SitesAnalytics;
