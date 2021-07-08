import React from 'react';
import { CursorEvent, EventWithTimestamp, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  progress: number;
  events: EventWithTimestamp[];
  playing: boolean;
  height: number;
  width: number;
  zoom: number;
}

interface State {
  index: number;
}

export class PlayerIframe extends React.Component<Props, State> {
  private timer: NodeJS.Timer;
  private mirror: TreeMirror;
  private iframe: React.RefObject<HTMLIFrameElement>;

  public constructor(props: Props) {
    super(props);

    this.state = { index: 0 };
    this.iframe = React.createRef();
  }

  public componentDidUpdate(prevProps: Props) {
    // Don't do anything if the states are the same
    if (prevProps.playing === this.props.playing) return;

    if (this.props.playing) {
      this.processEvent();
    } else {
      clearTimeout(this.timer);
    }
  }

  private get document() {
    return this.iframe.current.contentDocument;
  }

  private get host() {
    return this.props.site.url;
  }

  private get cursor() {
    return document.getElementById('cursor');
  }

  private clearPage = () => {
    while (this.document.firstChild) {
      this.document.removeChild(this.document.firstChild);
    }
  };

  private setIframeContents = (event: SnapshotEvent) => {
    try {
      const args = JSON.parse(event.snapshot);
      const mirror = this.mirror as any;

      if (event.event === 'initialize') {
        // The ID map cache needs to be busted between
        // every pay load or it thinks it's already rendered
        mirror.idMap = {};
        this.clearPage();
        mirror.initialize(...args);
      } else {
        mirror.applyChanged(...args);
      }
    } catch(error) {
      console.error(error);
    }
  };

  private processEvent = () => {
    clearTimeout(this.timer);

    const event = this.props.events[this.state.index];
    if (!event) return;

    switch(event.type) {
      case 'snapshot':
        this.setIframeContents(event);
        break;
      case 'scroll':
        this.document.body?.scrollTo({ left: event.x, top: event.y, behavior: 'smooth' });
        break;
      case 'cursor':
        this.cursor.style.transform = `translate(${event.x}px, ${event.y}px)`;
        break;
    }

    const nextEvent = this.props.events[this.state.index + 1];

    if (!nextEvent) return;

    const diff = nextEvent.timestamp - event.timestamp;

    this.timer = setTimeout(() => {
      this.setState({ index: this.state.index + 1 });
      this.processEvent();
    }, diff);
  };

  private onIframeLoad = () => {
    this.mirror = new TreeMirror(this.document, {
      createElement: (tagName: string) => {
        // Don't display any script tags
        if (tagName === 'SCRIPT') {
          const node = document.createElement('NO-SCRIPT');
          node.style.display = 'none';
          return node;
        }
  
        // Inject the base tag into the page so that
        // all of the pages relative assets become 
        // absolute
        if (tagName === 'HEAD') {
          const node = document.createElement('HEAD');
          node.appendChild(document.createElement('BASE'));
          (node.firstChild as HTMLLinkElement).href = this.host;
          return node;
        }

        return undefined;
      }
    });
  };

  private get cursorTrailCoords() {
    const event = this.props.events[this.state.index];
    const events = this.props.events.filter(e => e.type === 'cursor' && e.timestamp <= event.timestamp) as CursorEvent[];
    
    const coords = events
      .map(e => `${e.x} ${e.y} L `)
      .join('')
      .replace(/\sL\s$/, '');

    return `M ${coords}`;
  }

  public render(): JSX.Element {
    const props = {
      transform: `scale(${this.props.zoom})`, 
      height: this.props.height, 
      width: this.props.width
    };

    return (
      <main id='player'>
        <div className='player-container' style={props}>
          <div id='cursor' />
          <svg id='cursor-trail'>
          <path
            d={this.cursorTrailCoords}
            fill='transparent'
            stroke='var(--magenta-500)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
          </svg>
          <iframe scrolling='no' onLoad={this.onIframeLoad} ref={this.iframe} height='100%' width='100%' />
        </div>
      </main>
    );
  }
};
