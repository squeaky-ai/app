import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { PageSearch } from 'components/sites/page-search';

interface Props {
  page: string;
  pages: string[];
  setPage: (page: string) => void;
}

export const HeatmapsPages: FC<Props> = ({ page, pages, setPage }) => (
  <div className='heatmaps-pages'>
    <Label htmlFor='page-search'>Page</Label>
    <PageSearch page={page} pages={pages} setPage={setPage} />
  </div>
);