import React from 'react';
import { CursorEvent, EventWithTime, ScrollEvent, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  progress: number;
  events: EventWithTime[];
  height: number;
  width: number;
  zoom: number;
}

export class PlayerIframe extends React.Component<Props> {
  private mirror: TreeMirror;
  private iframe: React.RefObject<HTMLIFrameElement>;

  public constructor(props: Props) {
    super(props);

    this.iframe = React.createRef();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.progress !== this.props.progress) {
      this.handleBatchUpdate();
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
    const args = JSON.parse(event.snapshot);

    if (event.event === 'initialize') {
      // The ID map cache needs to be busted between
      // every pay load or it thinks it's already rendered
      (this.mirror as any).idMap = {};
      this.clearPage();
    }

    (this.mirror as any)[event.event].apply(this.mirror, args);
  };

  private handleSnapshotEvents = (events: SnapshotEvent[]) => {
    events.forEach(snapshot => {
      this.setIframeContents(snapshot)
    });
  };

  private handleScrollEvents = (events: ScrollEvent[]) => {
    if (events.length > 0) {
      const { x, y } = events[0];
      this.document.body?.scrollTo({ left: x, top: y, behavior: 'smooth' });
    }
  };

  private handleCursorEvents = (events: CursorEvent[]) => {
    if (events.length > 0) {
      const { x, y } = events[0];
      this.cursor.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  private handleBatchUpdate = () => {
    const batch = this.props.events.filter(event => event.time === this.props.progress);

    const snapshots = batch.filter(batch => batch.type === 'snapshot');
    const scrolls = batch.filter(batch => batch.type === 'scroll');
    const cursors = batch.filter(batch => batch.type === 'cursor');

    this.handleSnapshotEvents(snapshots as SnapshotEvent[]);
    this.handleScrollEvents(scrolls as ScrollEvent[]);
    this.handleCursorEvents(cursors as CursorEvent[]);
  };

  private createMirror = () => {
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

  private setFirstSnapshot = () => {
    const snapshot = this.props.events.find(e => e.type === 'snapshot' && e.event == 'initialize');

    if (snapshot) {
      this.setIframeContents(snapshot as SnapshotEvent);
    }
  };

  private onIframeLoad = () => {
    this.createMirror();   
    this.setFirstSnapshot();
  };

  public render(): JSX.Element {
    const props = {
      transform: `scale(${this.props.zoom})`, 
      height: this.props.height, 
      width: this.props.width
    };

    return (
      <main id='player'>
        <div className='test' style={props}>
          <div id='cursor' />
          <iframe scrolling='no' onLoad={this.onIframeLoad} ref={this.iframe} height='100%' width='100%' />
        </div>
      </main>
    );
  }
};
