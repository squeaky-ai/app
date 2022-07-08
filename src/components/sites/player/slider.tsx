import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Replayer } from 'rrweb';
import { clamp, debounce } from 'lodash';
import { Input } from 'components/input';
import { Inactivity } from 'components/sites/player/inactivity';
import { Icon } from 'components/icon';
import { getInteractionEvents, getMouseInteractionIcon, isPageViewEvent, isScrollEvent, isErrorEvent } from 'lib/events';
import { EventType, IncrementalSource } from 'rrweb';
import type { Recording } from 'types/graphql';
import type { Event, ErrorEvent } from 'types/event';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  events: Event[];
  recording: Recording;
  pressed: boolean;
  replayer: Replayer;
  duration: number;
  onMouseUp: VoidFunction;
  onMouseDown: VoidFunction;
  onChange: (value: number) => void;
}

export const Slider: FC<Props> = ({
  max,
  min,
  step,
  value,
  events,
  replayer,
  recording,
  pressed,
  duration,
  onChange,
  onMouseUp,
  onMouseDown, 
}) => {
  const [val, setVal] = React.useState<number>(0);

  const { totalPages, currentPage } = recording?.events?.pagination || { 
    totalPages: 0, 
    currentPage: 0 
  };

  const interactions = getInteractionEvents(events);
  
  const offset = events[0]?.timestamp || 0;
  const progress = clamp(value / (max - min), min, max);
  const buffered = currentPage / totalPages;

  const setValue = React.useCallback(debounce((number: number) => {
    onChange(number);
  }, 500), []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(event.target.value);
    // Update the state here so the UI is responsive
    setVal(number);
    // Fire the debounced callback so the replayer can update
    setValue(number);
  };

  const getIconForEventType = (event: Event | ErrorEvent) => {
    if (isPageViewEvent(event)) return 'compass-discover-line';
    if (isScrollEvent(event)) return 'mouse-line';
    if (event.type === EventType.IncrementalSnapshot && event.data.source === IncrementalSource.MouseInteraction) return getMouseInteractionIcon(event.data.type);
    if (isErrorEvent(event)) return 'code-s-slash-line';

    return 'question-mark';
  };

  // Update the value when it changes in the parent but
  // only if the user is currently clicking on the slider,
  // otherwise it will fight with it
  React.useEffect(() => {
    if (!pressed) {
      setVal(value);
    }
  }, [value]);

  return (
    <div className='slider'>
      <div className='bar buffered' style={{ width: `${clamp(buffered * 100, 0, 100)}%` }} />
      <div className='bar progress' style={{ width: `${clamp(progress * 100, 0, 100)}%` }} />

      {interactions.length && (
        <Inactivity replayer={replayer} duration={duration} />
      )}
      
      <div className='events'>
        {interactions.map((e, index) => (
          <div 
            key={e.id + index}
            className={classnames('event', { error: isErrorEvent(e) })}
            style={{ left: `${Math.round(((e.timestamp - offset) / duration) * 100)}%` }}
          >
            <Icon name={getIconForEventType(e)} />
          </div>
        ))}
      </div>

      <Input 
        type='range' 
        min={min} 
        max={max} 
        step={step} 
        value={val}
        onChange={handleChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    </div>
  );
};
