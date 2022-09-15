import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { PageSelector } from 'components/sites/page-selector';
import type { SitesPage } from 'types/graphql';

interface Props {
  page: string;
  pages: SitesPage[];
  setPage: (page: string) => void;
}

export const HeatmapsPages: FC<Props> = ({ page, pages, setPage }) => (
  <div className='heatmaps-pages'>
    <Label htmlFor='page-search'>Page</Label>
    <PageSelector
      type='click'
      selected={page}
      pages={pages}
      handleClick={page => setPage(page.url)}
    />
  </div>
);
