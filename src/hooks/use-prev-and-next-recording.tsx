import { useRouter } from 'next/router';
import { useSort } from 'hooks/use-sort';
import { usePeriod } from 'hooks/use-period';
import { useFilters } from 'hooks/use-filters';
import { cache } from 'lib/api/graphql';
import { getDateRange } from 'lib/dates';
import { GET_RECORDINGS_QUERY } from 'data/recordings/queries';
import type { Site, Recording, RecordingsSort, RecordingsFilters } from 'types/graphql';

interface Props {
  // Recording could not have loaded yet
  recording?: Recording;
}

interface UsePrevAndNextRecording {
  prev: string | null;
  next: string | null;
}

export const usePrevAndNextRecording = (props: Props): UsePrevAndNextRecording => {
  const router = useRouter();

  const { period } = usePeriod('recordings');
  const { sort } = useSort<RecordingsSort>('recordings');
  const { filters } = useFilters<RecordingsFilters>('recordings');

  const data = cache.readQuery<{ site: Site }>({
    query: GET_RECORDINGS_QUERY,
    variables: {
      siteId: router.query.site_id as string, 
      page: 1, 
      size: 25,
      sort,
      filters,
      ...getDateRange(period),
    }
  });

  const items = data?.site?.recordings?.items || [];
  const index = items.findIndex(r => r.id === props?.recording?.id);

  const getRecordingLink = (id: string) => id 
    ? `/sites/${router.query.site_id}/recordings/${id}` 
    : null;

  return {
    prev: getRecordingLink(items[index - 1]?.id),
    next: getRecordingLink(items[index + 1]?.id),
  };
};
