import React from 'react';
import { Replayer } from 'rrweb';
import { SliderV2 } from 'components/sites/player/slider-v2';
import { toTimeString } from 'lib/dates';
import { Action, PlayerStatus } from 'types/player';
import type { Recording } from 'types/graphql';
import type { Event } from 'types/event';
import type { PlayerState } from 'types/player';

interface Props {
  replayer: Replayer;
  status: PlayerStatus;
  playbackSpeed: number;
  events: Event[];
  recording: Recording;
  state: PlayerState;
  dispatch: React.Dispatch<Action>;
  handleSlide: (milliseconds: number, resume: boolean) => void;
}

interface State {
  value: number;
  pressed: boolean;
}

export class PlayerSliderV2 extends React.Component<Props, State> {
  private timer: number;
  private shouldResumeAfterSlide: boolean = true;

  public constructor(props: Props) {
    super(props);

    this.state = {
      value: 0,
      pressed: false,
    };
  }

  public componentWillUnmount(): void {
    this.stop();

    window.removeEventListener('keydown', this.onKeyPress, true);
  }

  public componentDidMount(): void {
    this.restart();

    window.addEventListener('keydown', this.onKeyPress);
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
      const value = this.getSliderPosition(currentTime);

      if (value !== this.state.value) {
        this.setState({ value });
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

  private onSlide = (percentage: number): void => {
    const value = percentage * this.durationInSeconds / 100;
    this.setState({ value });

    this.props.handleSlide(value * 1000, this.shouldResumeAfterSlide);
  };

  private onMouseDown = (): void => {
    console.log('!!');
    this.setState({ pressed: true });
    this.shouldResumeAfterSlide = this.props.replayer.service.state.value === 'playing';
    this.props.replayer.pause();
  };

  private onMouseUp = (): void => {
    this.setState({ pressed: false });
  };

  private onKeyPress = (event: KeyboardEvent) => {
    const tagName = (event.target as HTMLElement).tagName;

    if (tagName !== 'BODY') return;

    switch(event.code) {
      case 'Space':
        this.togglePlayPause();
    }
  };

  private getSeconds = (ms: number): number => {
    return Math.floor(ms / 1000);
  };

  private getSliderPosition = (ms: number): number => {
    return Number((ms / 1000).toFixed(2));
  };

  private togglePlayPause = () => {
    this.props.replayer.service.state.value === 'playing'
      ? this.props.replayer.pause()
      : this.props.replayer.play(this.props.replayer.getCurrentTime());
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
        <SliderV2
          value={this.state.value / this.durationInSeconds * 100}
          events={this.props.events}
          recording={this.props.recording}
          duration={this.duration}
          pressed={this.state.pressed}
          state={this.props.state}
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
