import React from 'react';
import { useRouter } from 'next/router';

interface UseEventIds {
  groupIds: string[]
  captureIds: string[];
  setGroupIds: (ids: string[]) => void;
  setCaptureIds: (ids: string[]) => void;
}

const toArrayOfStrings = (value: string[] | string) => typeof value === 'string' 
  ? value.split(',').filter(v => !!v)
  : value;

const updateQueryParams = (groupIds: string[], captureIds: string[]) => {
  const params = new URLSearchParams();

  groupIds.forEach(id => params.append('groupId', id));
  captureIds.forEach(id => params.append('captureId', id));

  const url = `${location.href.split('?')[0]}?${params.toString()}`;

  history.pushState(null, '', url);
};

export const useEventIds = (): UseEventIds => {
  const router = useRouter();

  const { captureId = '', groupId = '' } = router.query;

  const [groupIds, setGroupIds] = React.useState<string[]>(toArrayOfStrings(groupId));
  const [captureIds, setCaptureIds] = React.useState<string[]>(toArrayOfStrings(captureId));

  const setUpdatedGroupIds = (ids: string[]) => {
    setGroupIds(ids);
    updateQueryParams(ids, captureIds);
  };

  const setUpdatedCaptureIDs = (ids: string[]) => {
    setCaptureIds(ids);
    updateQueryParams(groupIds, ids);
  };

  return { 
    groupIds, 
    captureIds,
    setGroupIds: setUpdatedGroupIds,
    setCaptureIds: setUpdatedCaptureIDs,
  };
};
