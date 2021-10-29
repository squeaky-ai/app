import React from 'react';
import type { Replayer } from 'rrweb';
import { debounce } from 'lodash';
import { Spinner } from 'components/spinner';
import { Buffering } from 'components/sites/buffering';
import { recordingViewed } from 'lib/api/graphql';
import type { Recording } from 'types/recording';
import { PlayerState, Action, PlayerStatus } from 'types/player';
import type { Site } from 'types/site';

const MAIN_PADDING_SIZE = 24;

interface Props {
  site: Site;
  state: PlayerState;
  replayer: Replayer;
  recording: Recording;
  dispatch: React.Dispatch<Action>;
}

export class Player extends React.Component<Props> {
  private container: Element;

  private observer = new ResizeObserver(debounce(() => {
    this.squidgeToFit();
  }, 100));

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
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
    const { viewportX, viewportY } = this.props.recording.device;

    let multiplier = 1;

    // Keep shrinking the multiplier until the viewport of the player
    // window fits inside the bounds of the page
    while((viewportX * multiplier) > (width - MAIN_PADDING_SIZE) || (viewportY * multiplier) > (height - MAIN_PADDING_SIZE)) {
      multiplier -= .1;
    }

    // Once JS gets to .4, the precision goes to shit and it ends up
    // as 0.40000000000000013, so it must be fixed (to a string?! 🤦‍♂️)
    // and then cast back to a number
    this.props.dispatch({ type: 'zoom', value: Number(multiplier.toFixed(1)) });
  };

  public render(): JSX.Element {
    return (
      <main id='player'>
        <div className='player-container' style={{ transform: `scale(${this.props.state.zoom})` }}>
          {this.props.replayer ? null : <Spinner />}
          {this.props.state.status === PlayerStatus.LOADING && <Buffering />}
        </div>
      </main>
    );
  }
}
