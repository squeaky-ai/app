import React from 'react';
import { uniq } from 'lodash';
import { useRouter } from 'next/router';
import { EventsHistoryType } from 'types/graphql';

interface UseEventHistoryIds {
  groupIds: string[]
  captureIds: string[];
  addEventId: (id: string, type: EventsHistoryType) => void;
  removeEventId: (id: string, type: EventsHistoryType) => void;
}

const toArrayOfStrings = (value: string[] | string) => typeof value === 'string' 
  ? value.split(',').filter(v => !!v)
  : value;

const updateQueryParam = (search: string) => {
  const url = `${location.href.split('?')[0]}?${search}`;
  history.pushState(null, '', url);
};

const addToQueryParams = (id: string, type: EventsHistoryType) => {
  const key = `${type}Id`;
  const params = new URLSearchParams(location.search);
  
  params.append(key, id);
  
  updateQueryParam(params.toString());
};

const removeFromQueryParams = (id: string, type: EventsHistoryType) => {
  const key = `${type}Id`;
  const params = new URLSearchParams(location.search);
  const ids = params.getAll(key).filter(i => i !== id);

  params.delete(key);
  ids.forEach(id => params.append(key, id));
  
  updateQueryParam(params.toString());
};

export const useEventHistoryIds = (): UseEventHistoryIds => {
  const router = useRouter();

  const { captureId = '', groupId = '' } = router.query;

  const [groupIds, setGroupIds] = React.useState<string[]>(toArrayOfStrings(groupId));
  const [captureIds, setCaptureIds] = React.useState<string[]>(toArrayOfStrings(captureId));

  const addEventId = (id: string, type: EventsHistoryType) => {
    type === EventsHistoryType.Group
      ? setGroupIds(uniq([...groupIds, id]))
      : setCaptureIds(uniq([...captureIds, id]));

    addToQueryParams(id, type);
  };

  const removeEventId = (id: string, type: EventsHistoryType) => {
    type === EventsHistoryType.Group
      ? setGroupIds(groupIds.filter(i => i !== id))
      : setCaptureIds(captureIds.filter(i => i !== id));

    removeFromQueryParams(id, type);
  };

  return { groupIds, captureIds, addEventId, removeEventId };
};
