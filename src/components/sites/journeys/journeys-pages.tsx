import React from 'react';
import type { FC } from 'react';
import { PageSearch } from 'components/sites/page-search';

interface Props {
  page: string;
  pages: string[];
  setPage: (page: string) => void;
}

export const JourneysPages: FC<Props> = ({ page, pages, setPage }) => (
  <div className='journeys-pages'>
    <PageSearch page={page} pages={pages} setPage={setPage} />
  </div>
);
