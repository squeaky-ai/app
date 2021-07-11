import React from 'react';
import { last } from 'lodash';
import type { Recording } from 'types/recording';
import type { CursorEvent, ScrollEvent } from 'types/event';

interface Props {
  recording: Recording;
  cursor: CursorEvent[];
  scroll: [number, number];
}

export class PlayerCursor extends React.Component<Props> {
  // The bounds where the cursor can go, this is calculated
  // as (viewportX + maxScrollPositionX) x (viewportY + maxScrollPositionY)
  private cursorBounds: [number, number] = [0, 0];

  public constructor(props: Props) {
    super(props);
  }

  public componentDidMount() {
    const scrollEvents = this.props.recording.events.filter(e => e.type === 'scroll') as ScrollEvent[];

    const furthestX = Math.max(...scrollEvents.map(e => e.x));
    const furthestY = Math.max(...scrollEvents.map(e => e.y));

    this.cursorBounds = [
      this.props.recording.viewportX + furthestX,
      this.props.recording.viewportY + furthestY
    ];
  }

  private get cursorPosition() {
    const cursor = last(this.props.cursor);
    return cursor ? [cursor.x, cursor.y] : [0, 0];
  }

  private get cursorX() {
    return this.cursorPosition[0];
  }

  private get cursorY() {
    return this.cursorPosition[1];
  }

  private get scrollX() {
    return this.props.scroll[0];
  }

  private get scrollY() {
    return this.props.scroll[1];
  }

  private get cursorBoundX() {
    return this.cursorBounds[0];
  }

  private get cursorBoundY() {
    return this.cursorBounds[1];
  }

  private get trail() {
    const coords = this.props.cursor
      .map(({ x, y, offsetX, offsetY }) => `${x + offsetX} ${y + offsetY} L `)
      .join('')
      .replace(/\sL\s$/, '');

    return `M ${coords || '0 0'}`;
  }

  public render(): JSX.Element {
    return (
      <>
        <div id='cursor' style={{ transform: `translate(${this.cursorX}px, ${this.cursorY}px)` }} />
  
        <svg id='cursor-trail' style={{ width: this.cursorBoundX, height: this.cursorBoundY, transform: `translate(-${this.scrollX}px, -${this.scrollY}px)` }}>
          <path
            d={this.trail}
            fill='transparent'
            stroke='var(--magenta-500)'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      </>
    );
  }
}
