import React from 'react';
import { Replayer } from 'rrweb';
import { Slider } from 'components/sites/player/slider';
import { toTimeString } from 'lib/dates';
import { PlayerStatus } from 'types/player';
import type { Recording } from 'types/graphql';

interface Props {
  replayer: Replayer;
  status: PlayerStatus;
  playbackSpeed: number;
  recording: Recording;
  handleSlide: (seconds: number) => void;
}

interface State {
  value: number;
}

export class PlayerSlider extends React.Component<Props, State> {
  private timer: number;

  public constructor(props: Props) {
    super(props);

    this.state = { value: 0 };
  }

  public componentDidMount() {
    this.start();
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.status !== this.props.status) {
      this.props.status === PlayerStatus.PLAYING
        ? this.start()
        : this.stop();
    }

    if (prevProps.playbackSpeed !== this.props.playbackSpeed) {
      // Start and stop to pick up the latest value
      this.stop();
      this.start();
    }
  }

  private start = () => {
    this.stop();

    const update = () => {
      const { replayer } = this.props;

      const currentTime = replayer.getCurrentTime();
      const seconds = this.getSeconds(currentTime);

      if (seconds !== this.state.value) {
        this.setState({ value: seconds });
      }

      if (currentTime < this.meta.totalTime) {
        this.timer = requestAnimationFrame(update);
      }
    };

    this.timer = requestAnimationFrame(update);
  };

  private stop = () => {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
  };

  private onSlide = (value: number) => {
    this.setState({ value });
    this.props.handleSlide(value * 1000);
  };

  private getSeconds = (ms: number) => {
    return Math.floor(ms / 1000);
  };

  private get meta() {
    return this.props.replayer.getMetaData();
  }

  private get durationInSeconds() {
    return this.props.recording
      ? this.getSeconds(Number(this.props.recording.disconnectedAt) - Number(this.props.recording.connectedAt))
      : 0
  }

  private get currentTimeString() {
    return toTimeString(this.state.value * 1000);
  };

  private get totalTimeString() {
    return toTimeString(this.durationInSeconds * 1000);
  }

  public render(): JSX.Element {
    return (
      <>
        <Slider 
          min={0} 
          max={this.durationInSeconds} 
          step={1} 
          value={this.state.value}
          recording={this.props.recording}
          onChange={this.onSlide}
        />

        <span className='timestamps'>
          {this.currentTimeString} / {this.totalTimeString}
        </span>
      </>
    );
  }
}