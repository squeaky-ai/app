import React from 'react';
import type { Replayer } from 'rrweb';
import { debounce } from 'lodash';
import { Buffering } from 'components/sites/player/buffering';
import { recordingViewed } from 'lib/api/graphql';
import { initReplayer } from 'lib/replayer';
import { PlayerState, Action, PlayerStatus } from 'types/player';
import type { Recording } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { Event } from 'types/event';

interface Props {
  site: Site;
  state: PlayerState;
  events: Event[];
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export class Player extends React.Component<Props> {
  public replayer: Replayer;

  private container: Element;

  private observer = new ResizeObserver(debounce(() => {
    this.squidgeToFit();
  }, 100));

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    this.replayer = initReplayer({
      dispatch: this.props.dispatch,
      events: this.props.events,
      recording: this.props.recording,
    });

    this.squidgeToFit();
    this.container = document.getElementById('player');

    // The recording might already be in the cache 
    // so kick things off right away
    if (this.props.recording) {
      this.init();
    }
  }

  public componentWillUnmount() {
    this.observer.disconnect();

    this.replayer?.pause();
    this.replayer = null;
    // Clean up the contents of the div (this is not controlled
    // by react, it's injected by the player)
    document.querySelector('.replayer-wrapper')?.remove();
  }

  public componentDidUpdate(prevProps: Props) {
    // The recording wasn't cached, but it will exist
    // now
    if (!prevProps.recording && this.props.recording) {
      this.init();
    }
  }

  private init = (): void => {
    // Work out the sizing once it's loaded
    this.squidgeToFit();

    // Fire and forget here, should be okay
    this.markAsViewed();

    // It might have already unmounted
    if (!this.container) return;

    this.observer.observe(this.container);
  };

  private markAsViewed = async (): Promise<void> => {
    if (this.props.recording && !this.props.recording.viewed) {
      await recordingViewed({ 
        siteId: this.props.site.id,
        recordingId: this.props.recording.id 
      });
    }
  };

  private squidgeToFit = (): void => {
    if (!this.container) return;

    const { width, height } = this.container.getBoundingClientRect();

    const { width: viewportX, height: viewportY } = this.replayer.iframe;
    
    const constraint = Math.min(
      (width - 48) / Number(viewportX),
      (height - 48) / Number(viewportY),
    );

    this.props.dispatch({ type: 'zoom', value: constraint });
  };

  public render(): JSX.Element {
    return (
      <>
        <main id='player'>
          <div className='player-container' style={{ transform: `scale(${this.props.state.zoom})` }}>
            {this.props.state.status === PlayerStatus.LOADING && <Buffering />}
          </div>
        </main>
      </>
    );
  }
}
