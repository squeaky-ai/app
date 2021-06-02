import React from 'react';
import type { FC } from 'react';
import { Site } from 'data/sites/types';

interface SiteTrackingCodeProps {
  site: Site;
}

const SiteTrackingCode: FC<SiteTrackingCodeProps> = ({ site }) => (
  <>
    <h3>Install Squeaky on your site</h3>
  </>
);  

export default SiteTrackingCode;
