import React from 'react';
import type { FC } from 'react';
import { PageSelector } from 'components/sites/page-selector';
import type { SitesPage } from 'types/graphql';

interface Props {
  page: string;
  pages: SitesPage[];
  setPage: (page: string) => void;
}

export const JourneysPages: FC<Props> = ({ page, pages, setPage }) => (
  <div className='journeys-pages'>
    <PageSelector
      type='click'
      selected={page}
      pages={pages}
      handleClick={page => setPage(page.url)}
    />
  </div>
);
