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

  public componentWillUnmount(): void {
    this.stop();
  }

  public componentDidMount(): void {
    this.restart();
  }

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.status !== this.props.status) {
      this.props.status === PlayerStatus.PLAYING
        ? this.restart()
        : this.stop();
    }

    if (prevProps.playbackSpeed !== this.props.playbackSpeed) {
      this.restart();
    }
  }

  private restart = (): void => {
    this.stop();

    const update = () => {
      const currentTime = this.props.replayer.getCurrentTime();
      const seconds = this.getSeconds(currentTime);

      if (seconds !== this.state.value) {
        this.setState({ value: seconds });
      }

      if (currentTime < this.duration) {
        this.timer = requestAnimationFrame(update);
      }
    };

    this.timer = requestAnimationFrame(update);
  };

  private get duration() {
    return this.props.recording.duration;
  }

  private stop = (): void => {
    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }
  };

  private onSlide = (value: number): void => {
    this.setState({ value });
    this.props.handleSlide(value * 1000);
  };

  private getSeconds = (ms: number): number => {
    return Math.floor(ms / 1000);
  };

  private get durationInSeconds(): number {
    return this.getSeconds(this.duration);
  }

  private get currentTimeString(): string {
    return toTimeString(this.state.value * 1000);
  };

  private get totalTimeString(): string {
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
