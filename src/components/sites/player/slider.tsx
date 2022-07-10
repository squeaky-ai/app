import React from 'react';
import type { FC } from 'react';
import { clamp, debounce } from 'lodash';
import { Input } from 'components/input';
import { Inactivity } from 'components/sites/player/inactivity';
import { Interaction } from 'components/sites/player/interaction';
import { getInteractionEvents, getEventName } from 'lib/events';
import type { Recording } from 'types/graphql';
import type { Event } from 'types/event';
import type { PlayerState } from 'types/player';

interface Props {
  min: number;
  max: number;
  step: number;
  value: number;
  className?: string;
  events: Event[];
  recording: Recording;
  pressed: boolean;
  duration: number;
  state: PlayerState;
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
  recording,
  pressed,
  duration,
  state,
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
        <Inactivity inactivity={recording.inactivity} duration={duration} />
      )}
      
      <div className='events'>
        {interactions.map((e, index) => (
          <Interaction 
            key={`${e.id}_${index}`}
            duration={duration}
            event={e}
            offset={offset}
            hidden={!state.eventVisibility.includes(getEventName(e))}
          />
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
