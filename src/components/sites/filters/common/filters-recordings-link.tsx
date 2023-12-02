import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { Icon } from 'components/icon'
import { useFilters } from 'hooks/use-filters';
import { FILTERS } from 'data/recordings/constants';
import type { RecordingsFilters } from 'types/graphql';
import { useSiteId } from 'hooks/use-site-id';

interface Props {
  hint: string;
  action: Partial<RecordingsFilters>;
}

export const FiltersRecordingsLink: FC<Props> = ({ hint, action }) => {
  const router = useRouter();
  const [siteId] = useSiteId();

  const { setFilters } = useFilters<RecordingsFilters>('recordings');

  const handleClick = async () => {
    setFilters({ ...FILTERS, ...action });
    await router.push(`/sites/${siteId}/recordings`);
  };

  return (
    <Tooltip onClick={handleClick} buttonClassName='filters-link' positionX='right' fluid button={<Icon name='vidicon-line' />}>
      {hint}
    </Tooltip>
  );
};
