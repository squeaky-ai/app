import React from 'react';
import { last } from 'lodash';
import { Replayer } from 'rrweb';
import { EventType, IncrementalSource } from 'rrweb';
import type { eventWithTime } from 'rrweb/typings/types';

interface Props {
  duration: number;
  replayer: Replayer;
}

const SKIP_TIME_INTERVAL = 5 * 1000;
const SKIP_TIME_THRESHOLD = 10 * 1000;
const MAX_SPEED = 25; // Same as /src/lib/replayer

export class Inactivity extends React.Component<Props> {
  private skipping: boolean = false;
  private skippingSpeed: number = 1;
  private nextUserInteractionEvent?: eventWithTime;
  private inactivity: number[][] = [];

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount(): void {
    this.events.forEach(event => this.processEvent(event));
  }

  private get events() {
    return this.props.replayer.service.state.context.events;
  }

  private backToNormal = () => {
    this.nextUserInteractionEvent = null;
    this.skippingSpeed = 0;
  };

  private leftPositionFromDuration(inactivity: number[]) {
    return [
      Math.round(((inactivity[0]) / this.props.duration) * 100),
      Math.round(((inactivity[1]) / this.props.duration) * 100),
    ];
  }

  private isUserInteraction = (event: eventWithTime): boolean => {
    if (event.type !== EventType.IncrementalSnapshot) {
      return false;
    }

    return event.data.source > IncrementalSource.Mutation && event.data.source <= IncrementalSource.Input;
  }
  
  private processEvent = (event: eventWithTime) => {
    if (event === this.nextUserInteractionEvent) {
      this.nextUserInteractionEvent = null;
      this.backToNormal();
    }

    if (!this.nextUserInteractionEvent) {
      for (const evt of this.events) {
        if (evt.timestamp <= event.timestamp) {
          continue;
        }

        if (this.isUserInteraction(evt)) {
          if (evt.delay! - event.delay! > SKIP_TIME_THRESHOLD * this.skippingSpeed) {
            this.nextUserInteractionEvent = evt;
          }
          break;
        }
      }

      if (this.nextUserInteractionEvent) {
        const skipTime = this.nextUserInteractionEvent.delay! - event.delay!;
        this.skippingSpeed = Math.min(Math.round(skipTime / SKIP_TIME_INTERVAL), MAX_SPEED);

        if (this.skippingSpeed > 0 && !this.skipping) {
          this.inactivity.push([event.delay]);
          this.skipping = true;
        }

        if (this.skippingSpeed === 0 && this.skipping) {
          last(this.inactivity).push(event.delay);
          this.skipping = false;
        }
      }
    }
  };

  public render(): JSX.Element {
    console.log('Inactivity', this.inactivity);
    return (
      <div className='inactivity'>
        {this.inactivity.map((inactivity, index) => {
          const [left, right] = this.leftPositionFromDuration(inactivity);


          console.log('Left and right', [left, right]);

          return (
            <div
              key={index}
              className='block' 
              style={{ left: `${left}%`, width: `${right - left}%` }}
            />
          );
        })}
      </div>
    );
  }
}
