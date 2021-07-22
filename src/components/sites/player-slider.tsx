import React from 'react';
import { Slider } from 'components/slider';
import type { Recording } from 'types/recording';

interface Props {
  playing: boolean;
  playbackSpeed: number;
  recording: Recording;
  handleSlide: (seconds: number) => void;
}

interface State {
  value: number;
}

export class PlayerSlider extends React.Component<Props, State> {
  private timer: NodeJS.Timer;

  public constructor(props: Props) {
    super(props);

    this.state = { value: 0 };
  }

  public componentDidUpdate(prevProps: Props) {
    if (prevProps.playing !== this.props.playing) {
      this.props.playing
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
    this.timer = setInterval(() => {
      // Don't go past the max value
      if (this.state.value >= this.durationInSeconds) {
        return clearTimeout(this.timer);
      }

      this.setState({ value: this.state.value + 1 });
    }, this.interval);
  };

  private stop = () => {
    clearInterval(this.timer);
  };

  private toTimeString(seconds: number) {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(14, 5);
  }

  private onSlide = (event: React.ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    const value = Number(element.value);
    this.setState({ value });
    this.props.handleSlide(value * 1000);
  };

  private get interval() {
    return 1000 / this.props.playbackSpeed;
  }

  private get durationInSeconds() {
    if (!this.props.recording) return 0;

    const firstEventTime = this.props.recording.connectedAt;
    const lastEventTime = this.props.recording.disconnectedAt || firstEventTime;
  
    return Math.floor((lastEventTime - firstEventTime) / 1000);
  }

  private get currentTimeString() {
    return this.toTimeString(this.state.value);
  };

  private get totalTimeString() {
    return this.toTimeString(this.durationInSeconds);
  }

  public render(): JSX.Element {
    return (
      <>
        <Slider 
          type='range' 
          min={0} 
          max={this.durationInSeconds} 
          step={1} 
          value={this.state.value} 
          onChange={this.onSlide} 
        />

        <span className='timestamps'>
          {this.currentTimeString} / {this.totalTimeString}
        </span>
      </>
    );
  }
}
