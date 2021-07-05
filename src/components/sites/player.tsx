import React from 'react';
import type { FC } from 'react';
import { EventWithTimestamp, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import { usePlayerState } from 'hooks/player-state';
import type { Site } from 'types/site';
import type { PlayerState } from 'components/sites/player-provider';

interface Props {
  site: Site;
  events: EventWithTimestamp[];
}

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

      return null;
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
  (mirror as any)[event.event].apply(mirror, args);
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

const Player: FC<Props> = ({ site }) => {
  const [state] = usePlayerState();
  const iframe = React.useRef<HTMLIFrameElement>(null);

  const player = iframe.current?.contentDocument;
  const iframeProps = getIframeProps(state);

  let mirror: TreeMirror;

  const onIframeLoaded = () => {
    mirror = createMirror(player, site.url);
    clearDocument(player);
  };

  return (
    <main id='player'>
      <iframe id='player' scrolling="no" onLoad={onIframeLoaded} ref={iframe} style={iframeProps} />
    </main>
  );
};

export default Player;
