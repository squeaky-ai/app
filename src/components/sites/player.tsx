import React from 'react';
import type { FC } from 'react';
import { first, sortBy, round } from 'lodash';
import { EventWithTimestamp, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import { usePlayerState } from 'hooks/player-state';
import type { Site } from 'types/site';
import type { PlayerState } from 'components/sites/player-provider';

interface Props {
  site: Site;
  events: EventWithTimestamp[];
}

type EventWithTime = EventWithTimestamp & { time: number };

/**
 * Create an instance of the TreeMirror class using the
 * document of the iFrame. We don't want to load script
 * tags from the site, so they are changed no no-script
 * tags. The <base /> element is injected into the head
 * so that all relative assets use the absolute path.
 * @param {Document} player 
 * @param {string} host 
 * @returns {TreeMirror}
 */
const createMirror = (player: Document, host: string): TreeMirror => {
  return new TreeMirror(player, {
    createElement: (tagName: string) => {
      // Don't display any script tags
      if (tagName === 'SCRIPT') {
        const node = player.createElement('NO-SCRIPT');
        node.style.display = 'none';
        return node;
      }

      // Inject the base tag into the page so that
      // all of the pages relative assets become 
      // absolute
      if (tagName === 'HEAD') {
        const node = player.createElement('HEAD');
        node.appendChild(player.createElement('BASE'));
        (node.firstChild as HTMLLinkElement).href = host;
        return node;
      }

      return undefined;
    }
  });
};

/**
 * When the TreeMirror rebuilds the page, it expects that
 * the DOM will be completely empty. However, browsers
 * inject some base stuff like a <head /> tag when you omit
 * it. These have to go or it will cause problems.
 * @param {Document} player 
 * @return {void}
 */
const clearDocument = (player: Document): void => {
  while (player && player.firstChild) {
    player.removeChild(player.firstChild);
  }
};

/**
 * Take the contents of the event snapshot and apply it to
 * the tree mirror.
 * @param {SnapshotEvent} event 
 * @param {TreeMirror} mirror 
 * @return {void}
 */
const setIframeContents = (event: SnapshotEvent, mirror: TreeMirror): void => {
  const args = JSON.parse(event.snapshot);
  console.log(args, mirror);
  // (mirror as any)[event.event].apply(mirror, args);
};

/**
 * Get the viewport sizes and the current zoom from the 
 * state and return the formatted style object
 * @param {PlayerState} state 
 * @returns {React.CSSProperties}
 */
const getIframeProps = (state: PlayerState): React.CSSProperties => ({
  transform: `scale(${state.zoom})`, 
  height: state.recording.viewportY, 
  width: state.recording.viewportX
});

/**
 * In order to get relative time (i.e. x ms from 0), the
 * first events timestamp must be sutracted from all of 
 * the timestamps
 * @param {PlayerState} state 
 * @returns {number}
 */
const getTimestampOffset = (state: PlayerState): number => {
  const sorted = sortBy(state.recording.events, (event) => Number(event.timestamp));

  return first(sorted)?.timestamp || 0;
};

/**
 * Use the offset to calculate the relative time for the
 * event, and them round it to the neareset 100ms so we 
 * can play back with reasoable performance
 * @param {EventWithTimestamp} event 
 * @param {number} offset
 * @param {number} precision 
 * @returns {EventWithTimestamp}
 */
const roundToNearestTimestamp = (event: EventWithTimestamp, offset: number, precision: number = -2): EventWithTime => {
  const relative = event.timestamp - offset;
  const time = round(relative, precision);
  
  return { ...event, time };
};

/**
 *  We can't possibly play stuff back with millisecond
 * accuracy and it's unlikely that users will be able to tell
 * the difference between 50ms or so. Events are rounded up
 * to the nearest 100 milliseconds
 * @param {PlayerState} state 
 * @returns {EventWithTime[]}
 */
const getEventsWithRoundedTimestamps = (state: PlayerState): EventWithTime[] => {
  const offset = getTimestampOffset(state);
  const events = state.recording.events.map(event => roundToNearestTimestamp(event, offset));

  return sortBy(events, (event) => event.time);
};

const Player: FC<Props> = ({ site }) => {
  const [state] = usePlayerState();
  const [events, setEvents] = React.useState<EventWithTime[]>([]);
  const [mirror, setMirror] = React.useState<TreeMirror>(null);
  const iframe = React.useRef<HTMLIFrameElement>(null);

  const player = iframe.current?.contentDocument;
  const iframeProps = getIframeProps(state);

  // Don't caculate this on every render or you might set
  // someones phone on fire
  React.useEffect(() => {
    const eventsWithTimestamps = getEventsWithRoundedTimestamps(state);
    setEvents(eventsWithTimestamps);
  }, [state.recording.events]);

  // Listen to the progress change and grab events that fit
  // into this batch
  React.useEffect(() => {
    const batch = events.filter(event => event.time === state.progress);

    const snapshot = batch.find(batch => batch.type === 'snapshot');

    if (snapshot) {
      setIframeContents(snapshot as SnapshotEvent, mirror);
    }
  }, [state.progress]);

  const onIframeLoaded = () => {
    setMirror(createMirror(player, site.url));
    clearDocument(player);
  };

  return (
    <main id='player'>
      <iframe id='player' scrolling="no" onLoad={onIframeLoaded} ref={iframe} style={iframeProps} />
    </main>
  );
};

export default Player;
