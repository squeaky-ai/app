import React from 'react';
import { Replayer } from 'rrweb';
import { Slider } from 'components/sites/player/slider';
import { toTimeString } from 'lib/dates';
import { Action, PlayerStatus } from 'types/player';
import type { Recording } from 'types/graphql';
import type { Event } from 'types/event';

interface Props {
  replayer: Replayer;
  status: PlayerStatus;
  playbackSpeed: number;
  events: Event[];
  recording: Recording;
  handleSlide: (seconds: number) => void;
  dispatch: React.Dispatch<Action>;
}

interface State {
  value: number;
  pressed: boolean;
}

export class PlayerSlider extends React.Component<Props, State> {
  private timer: number;

  public constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
      pressed: false,
    };
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

    if (!this.state.pressed) {
      this.props.handleSlide(value * 1000);
    }
  };

  private onMouseDown = (): void => {
    this.setState({ pressed: true });
    this.props.replayer.pause();
  };

  private onMouseUp = (): void => {
    this.setState({ pressed: false });
    this.props.replayer.play(this.state.value * 1000);
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
          events={this.props.events}
          recording={this.props.recording}
          duration={this.duration}
          pressed={this.state.pressed}
          onChange={this.onSlide}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />

        <span className='timestamps'>
          {this.currentTimeString} / {this.totalTimeString}
        </span>
      </>
    );
  }
}
