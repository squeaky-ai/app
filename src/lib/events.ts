import type { Event } from 'types/event';
import type { Recording } from 'types/recording';

export const parseEvents = (recording: Recording) => {
  return recording
    .events
    .map(e => <Event>JSON.parse(e))
    .sort((a, b) => a.timestamp - b.timestamp);
};
