import React from 'react';
import { EventWithTimestamps, SnapshotEvent } from 'types/event';
import { TreeMirror } from 'mutation-summary';
import type { Site } from 'types/site';

interface Props {
  site: Site;
  events: EventWithTimestamps[];
}

export default class Player extends React.Component<Props> {
  private mirror: TreeMirror;
  private iframe: React.RefObject<HTMLIFrameElement>;

  public constructor(props: Props) {
    super(props);

    this.iframe = React.createRef();
  }

  public componentDidMount() {
    const max = Math.max(...this.props.events.map(e => e.time));
    this.setState({ max });
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
    const type = event.event === 'apply_changed' ? 'applyChanged' : event.event;
    (this.mirror as any)[type].apply(this.mirror, args);
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
      <main id='player'>
        <iframe scrolling="no" onLoad={this.iframeLoaded} ref={this.iframe} width='100%' height='100%' />
      </main>
    );
  }
}