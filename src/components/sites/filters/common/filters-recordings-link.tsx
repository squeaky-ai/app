import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Tooltip } from 'components/tooltip';
import { Icon } from 'components/icon'
import { useFilters } from 'hooks/use-filters';
import type { RecordingsFilters } from 'types/graphql';

interface Props {
  hint: string;
  action: Partial<RecordingsFilters>;
}

export const FiltersRecordingsLink: FC<Props> = ({ hint, action }) => {
  const router = useRouter();

  const { filters, setFilters } = useFilters<RecordingsFilters>('recordings');

  const handleClick = async () => {
    setFilters({ ...filters, ...action });
    await router.push(`/sites/${router.query.site_id}/recordings`);
  };

  return (
    <Tooltip onClick={handleClick} buttonClassName='filters-link' positionX='right' fluid button={<Icon name='vidicon-line' />}>
      {hint}
    </Tooltip>
  );
};
