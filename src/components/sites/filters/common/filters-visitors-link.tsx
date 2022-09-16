import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { Icon } from 'components/icon'
import { useFilters } from 'hooks/use-filters';
import { FILTERS } from 'data/visitors/constants';
import type { VisitorsFilters } from 'types/visitors';

interface Props {
  hint: string;
  action: Partial<VisitorsFilters>;
}

export const FiltersVisitorsLink: FC<Props> = ({ hint, action }) => {
  const router = useRouter();

  const { setFilters } = useFilters<VisitorsFilters>('visitors');

  const handleClick = async () => {
    setFilters({ ...FILTERS, ...action });
    await router.push(`/sites/${router.query.site_id}/visitors`);
  };

  return (
    <Tooltip onClick={handleClick} buttonClassName='filters-link' positionX='right' fluid button={<Icon name='group-line' />}>
      {hint}
    </Tooltip>
  );
};
