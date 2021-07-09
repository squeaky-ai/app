import React from 'react';
import { CursorEvent, PageViewEvent, ScrollEvent, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import type { Site } from 'types/site';
import type { Recording } from 'types/recording';

interface Props {
  site: Site;
  recording: Recording;
  playing: boolean;
  zoom: number;
}

interface State {
  index: number;
  cursor: [number, number][];
}

export class PlayerIframe extends React.Component<Props, State> {
  private timer: NodeJS.Timer;
  private mirror: TreeMirror;
  private iframe: React.RefObject<HTMLIFrameElement>;

  public constructor(props: Props) {
    super(props);

    this.state = { 
      index: 0,
      cursor: []
    };

    this.iframe = React.createRef();
  }

  public componentDidUpdate(prevProps: Props) {
    // Don't do anything if the states are the same
    if (prevProps.playing === this.props.playing) return;

    if (this.props.playing && this.mirror) {
      this.processEvent();
    } else {
      clearTimeout(this.timer);
    }
  }

  private get document() {
    return this.iframe.current.contentDocument;
  }

  private get cursor() {
    return this.document.getElementById('__squeaky_cursor');
  }

  private get cursorTail() {
    return this.document.getElementById('__squeaky_cursor_tail').firstChild as SVGPathElement;
  }

  private get host() {
    return this.props.site.url;
  }

  private clearPage = () => {
    while (this.document.firstChild) {
      this.document.removeChild(this.document.firstChild);
    }
  };

  private postMessage = (args: any) => {
    const message = JSON.stringify(args);
    this.iframe.current.contentWindow.postMessage(message, location.origin);
  };

  private handleSnapshotEvent = (event: SnapshotEvent) => {
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
  };

  private handlePageviewEvent = (_event: PageViewEvent) => {
    // Reset the cursors on every page view, otherwise it will 
    // accumulate the cursor trail across the entire session!
    this.setState({ cursor: [] });
  };

  private handleScrollEvent = (event: ScrollEvent) => {
    this.postMessage({ x: event.x, y: event.y, });
  };

  private handleCursorEvent = (event: CursorEvent) => {
    // Add the event to the list of existing cursor
    // events for this page
    this.setState({ cursor: [...this.state.cursor, [event.x, event.y]]});
    // Position the mouse cursor
    this.cursor.style.transform = `translate(${event.x}px, ${event.y}px)`;
    // Build the SVG path so that it draws a continuous
    // line
    const coords = this.state.cursor
      .map(([x, y]) => `${x} ${y} L `)
      .join('')
      .replace(/\sL\s$/, '');
    // Update the svg path
    this.cursorTail.setAttribute('d', `M ${coords}`);
  };

  private processEvent = () => {
    // We only want one thing happening at once
    clearTimeout(this.timer);

    const event = this.props.recording.events[this.state.index];
    if (!event) return;

    switch(event.type) {
      case 'snapshot':
        this.handleSnapshotEvent(event);
        break;
      case 'pageview':
        this.handlePageviewEvent(event);
        break;
      case 'scroll':
        this.handleScrollEvent(event);
        break;
      case 'cursor':
        this.handleCursorEvent(event);
        break;
    }

    const nextEvent = this.props.recording.events[this.state.index + 1]
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
        if (tagName === 'SCRIPT') {
          // Replace all nodes that are script tags with
          // no-script to prevent any scripts from loading
          const node = document.createElement('NO-SCRIPT');
          node.style.display = 'none';
          return node;
        }
  
        if (tagName === 'HEAD') {
          // Inject the base tag into the page so that
          // all of the pages relative assets become 
          // absolute
          const node = document.createElement('HEAD');
          const base = document.createElement('BASE') as HTMLLinkElement;
          base.href = this.host

          // Inject a message listener into the page so
          // that the scroll position can be controlled
          // from outside the iframe
          const script = document.createElement('SCRIPT') as HTMLScriptElement;
          script.innerHTML = `
            window.addEventListener('message', (event) => {
              if (event.origin === '${location.origin}') {
                const { x, y } = JSON.parse(event.data);
                window.scrollTo({ left: x, top: y, behaviour: 'smooth' });
              }
            });
          `;

          // Inject some styles for so that the host can 
          // the position of the cursor and draw the mouse
          // tail
          const style = document.createElement('STYLE') as HTMLStyleElement;
          style.innerHTML = `
            #__squeaky_cursor {
              background: #F0438C;
              border-radius: 50%;
              height: 2rem;
              left: 0;
              position: absolute;
              top: 0;
              width: 2rem;
              z-index: 999;
            }

            #__squeaky_cursor_tail {
              height: 1000%;
              left: 0;
              position: absolute;
              top: 0;
              width: 100%;
              z-index: 999;
            }
          `;

          node.appendChild(base);
          node.appendChild(script);
          node.appendChild(style);

          return node;
        }

        if (tagName === 'BODY') {
          // Inject the cursor into the body, it will make
          // it much easier to place the cursor in the right
          // place as it will be relative to the real body
          // and will work nicely with zooming
          const node = document.createElement('BODY');

          // The actual cursor
          const cursor = document.createElement('div');
          cursor.id = '__squeaky_cursor';

          // The SVG that will contains the path that draws
          // the tail of the cursor movements
          const tail = document.createElement('svg');
          tail.id = '__squeaky_cursor_tail';
          tail.innerHTML = '<path d="M 0 0" fill="transparent" stroke="#F0438C" stroke-width="2" />';

          node.appendChild(cursor);
          node.appendChild(tail);

          return node;
        }

        return undefined;
      }
    });
  };

  public render(): JSX.Element {
    const props = {
      transform: `scale(${this.props.zoom})`, 
      height: this.props.recording.viewportY, 
      width: this.props.recording.viewportX
    };

    return (
      <main id='player'>
        <div className='player-container' style={props}>
          <iframe src='/_blank.html' onLoad={this.onIframeLoad} scrolling='no' ref={this.iframe} height='100%' width='100%' />
        </div>
      </main>
    );
  }
};
