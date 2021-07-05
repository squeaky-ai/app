import React from 'react';
import type { FC } from 'react';
import { EventWithTimestamp, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import type { Site } from 'types/site';
import { usePlayerState } from 'hooks/player-state';

interface Props {
  site: Site;
  events: EventWithTimestamp[];
}

const Player: FC<Props> = () => {
  const [state] = usePlayerState();
  const iframe = React.useRef<HTMLIFrameElement>(null);

  const iframeProps = {
    transform: `scale(${state.zoom})`, 
    height: state.recording.viewportY, 
    width: state.recording.viewportX
  };

  return (
    <main id='player'>
      <iframe id='player' scrolling="no" onLoad={console.log} ref={iframe} style={iframeProps} />
    </main>
  );
};

export default Player;

export class Player1 extends React.Component<Props> {
  private mirror: TreeMirror;
  private iframe: React.RefObject<HTMLIFrameElement>;

  public constructor(props: Props) {
    super(props);

    this.iframe = React.createRef();
  }

  private get document() {
    return this.iframe.current.contentDocument;
  }

  private get host() {
    return this.props.site.url;
  }

  private clearPage = () => {
    while (this.document.firstChild) {
      this.document.removeChild(this.document.firstChild);
    }
  };

  private setIframeContents = (event: SnapshotEvent) => {
    const args = JSON.parse(event.snapshot);
    (this.mirror as any)[event.event].apply(this.mirror, args);
  }

  private iframeLoaded = () => {
    this.mirror = new TreeMirror(this.document, {
      createElement: (tagName: string) => {
        // Don't display any script tags
        if (tagName === 'SCRIPT') {
          var node = document.createElement('NO-SCRIPT');
          node.style.display = 'none';
          return node;
        }
  
        // Inject the base tag into the page so that
        // all of the pages relative assets become 
        // absolute
        if (tagName === 'HEAD') {
          var node = document.createElement('HEAD');
          node.appendChild(document.createElement('BASE'));
          (node.firstChild as HTMLLinkElement).href = this.host;
          return node;
        }

        return node;
      }
    });

    this.clearPage();

    const snapshot = this.props.events.find(e => e.type === 'snapshot');
  
    if (snapshot) {
      this.setIframeContents(snapshot as SnapshotEvent);
    }
  };

  public render(): JSX.Element {
    return (
      <main id='player' style={{ transform: 'scale(1)' }}>
        <iframe scrolling="no" onLoad={this.iframeLoaded} ref={this.iframe} width='100%' height='100%' />
      </main>
    );
  }
}