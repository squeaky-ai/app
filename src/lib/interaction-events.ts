import { last } from 'lodash';
import { getEventLabel, getEventName } from 'lib/events';
import { Events, InteractionEventItem } from 'types/event';
import { PlanFeature, Recording } from 'types/graphql';
import { PlayerState } from 'types/player';

declare global {
  interface Window {
    interactionEvents?: InteractionEvents;
  }
}

class InteractionEvents {
  private events: Events;
  private state: PlayerState;
  private featuresEnabled: PlanFeature[];
  private inactivity?: number[][];

  public startedAt: number;
  public recording: Recording;
  public interactionEvents: InteractionEventItem[];

  public constructor(
    recording: Recording,
    events: Events,
    state: PlayerState,
    featuresEnabled: PlanFeature[],
    inactivity?: number[][],
  ) {
    this.events = events;
    this.state = state;
    this.featuresEnabled = featuresEnabled;
    this.inactivity = inactivity;
    this.recording = recording;

    this.startedAt = this.events[0]?.timestamp || 0;

    this.interactionEvents = this.buildEvents();
  }

  private buildEvents(): InteractionEventItem[] {
    const events = [
      ...this.baseEvents,
      ...this.inactivityEvents,
    ];

    const mutations = [
      this.condenseInactivity,
      this.insertRageClicks,
      this.sortEvents,
    ];

    return mutations.reduce((e, func) => func(e), events);
  }

  private get baseEvents() {
    return this.events.reduce((acc, item) => {
      const eventName = getEventName(item);
  
      if (eventName === 'unknown') return acc;
      if (eventName === 'error' && !this.featuresEnabled.includes(PlanFeature.ErrorTracking)) return acc;
      if (eventName === 'custom' && !this.featuresEnabled.includes(PlanFeature.EventTracking)) return acc;
  
      const event: InteractionEventItem = {
        eventName,
        id: item.id,
        show: this.state.eventVisibility.includes(eventName),
        timestampStart: item.timestamp,
        timestampEnd: null,
        label: getEventLabel(eventName),
        info: null,
      };
  
      const data = item.data as any; // TODO
  
      if (eventName === 'page_view') {
        event.info = data.href;
      }
  
      if (['click', 'blur', 'focus', 'touch', 'context'].includes(eventName)) {
        event.info = data.selector || 'Unknown';
      }
  
      if (eventName === 'error') {
        event.info = data.message;
      }
  
      if (eventName === 'scroll') {
        const prevEvent = last(acc);
        if (prevEvent?.eventName === 'scroll') {
          prevEvent.timestampEnd = item.timestamp;
          return acc;
        }
      }
  
      return [...acc, event]
    }, [] as InteractionEventItem[]);
  }

  private get inactivityEvents(): InteractionEventItem[] {
    if (!this.inactivity) return [];

    return this.inactivity.map((inactivity, index) => ({
      id: `inactivity-${index}`,
      eventName: 'inactivity',
      label: 'Inactivity',
      show: this.state.eventVisibility.includes('inactivity'),
      timestampStart: this.startedAt + Number(inactivity[0]),
      timestampEnd: this.startedAt + Number(inactivity[1]),
      info: '',
    }));
  }

  private sortEvents(events: InteractionEventItem[]): InteractionEventItem[] {
    return [...events].sort((a, b) => a.timestampStart - b.timestampStart);
  }

  // HACK: The inactivity is not precise enough and multiple
  // can stack up against each other, better to just combine
  // them so it doesn't look jank
  private condenseInactivity(events: InteractionEventItem[]): InteractionEventItem[] {
    return events.reduce((acc, result) => {
      if (result.eventName === 'inactivity' && last(acc)?.eventName === 'inactivity') {
        return [...acc.slice(0, -1), { ...last(acc), timestampEnd: result.timestampEnd }];
      } 

      return [...acc, result];
    }, []);
  }

  // Replace any clicks that fall into the 'rage click'
  // definition, which is 5 or more clicks within 750ms
  private insertRageClicks(events: InteractionEventItem[]): InteractionEventItem[] {
    const clicks = events.filter(e => e.eventName === 'click');

    clicks.forEach(click => {
      const timestamp = click.timestampStart;

      const rage = clicks.filter(c => {
        const from = timestamp - 375;
        const to   = timestamp + 375;

        return c.timestampStart >= from && c.timestampStart <= to;
      });

      if (rage.length >= 5) {
        const rageClickIds = rage.map(r => r.id);
        events = events.filter(e => !rageClickIds.includes(e.id));

        const timestampStart = timestamp;
        const timestampEnd = last(rage).timestampStart; // There's no end on clicks
        const duration = ((timestampEnd - timestampStart) / 1000).toFixed(2);

        events.push({
          id: click.id,
          eventName: 'rage_click',
          label: 'Rage Click',
          show: true,
          timestampStart,
          timestampEnd,
          info: `${rage.length} clicks in ${duration}s`,
        });
      }
    });

    return events;
  }
}

// This keeps a cache of the interaction events on the window
// and changes whenver the recording id changes. It's very
// expensive to calculate!
export const getInteractionEvents = (
  recording: Recording,
  events: Events,
  state: PlayerState,
  featuresEnabled: PlanFeature[],
  inactivity?: number[][],
): { interactionEvents: InteractionEventItem[], startedAt: number } => {
  if (window.interactionEvents?.recording?.id === recording.id) {
    return window.interactionEvents;
  }

  window.interactionEvents = new InteractionEvents(
    recording,
    events,
    state,
    featuresEnabled,
    inactivity,
  );

  return {
    interactionEvents: window.interactionEvents.interactionEvents,
    startedAt: window.interactionEvents.startedAt,
  };
};
