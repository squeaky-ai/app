import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { clamp, debounce } from 'lodash';
import { Button } from 'components/button';
import { Activity } from 'components/sites/player/activity';
import { Interaction } from 'components/sites/player/interaction';
import { getInteractionEvents } from 'lib/events';
import type { Recording, Site } from 'types/graphql';
import type { Event } from 'types/event';
import type { PlayerState } from 'types/player';

interface Props {
  site: Site,
  value: number;
  className?: string;
  events: Event[];
  recording: Recording;
  pressed: boolean;
  duration: number;
  state: PlayerState;
  onMouseUp: VoidFunction;
  onMouseDown: VoidFunction;
  onChange: (percentage: number) => void;
}

export const Slider: FC<Props> = ({
  site,
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
  const ref = React.useRef<HTMLDivElement>(null);
  const clicked = React.useRef<boolean>(false);

  const [val, setVal] = React.useState<number>(0);

  const { totalPages, currentPage } = recording?.events?.pagination || { 
    totalPages: 0, 
    currentPage: 0 
  };

  const { interactionEvents } = getInteractionEvents(
    events,
    state,
    site.plan.featuresEnabled,
  );
  
  const offset = events[0]?.timestamp || 0;
  const progress = value;
  const buffered = currentPage / totalPages;

  const bufferedWidth = clamp(buffered * 100, 0, 100);
  const progressedWith = clamp(progress * 100, 0, 100);

  const setValue = React.useCallback(debounce((percentage: number) => {
    onChange(percentage);
  }, 500), []);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();

    clicked.current = true;
    onMouseDown();
  };

  const handleMouseUp = () => {
    clicked.current = false;
    onMouseUp();
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (clicked.current) {
      setValueFromEvent(event);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    onMouseDown();
    setValueFromEvent(event);
  };

  const setValueFromEvent = (event: MouseEvent | React.MouseEvent) => {
    const { left, width } = ref.current.getBoundingClientRect();
    const position = event.clientX - left;
    const percentage = clamp((position / width) * 100, 0, 100);
    setVal(percentage);
    setValue(percentage);
  };

  // Update the value when it changes in the parent but
  // only if the user is currently clicking on the slider,
  // otherwise it will fight with it
  React.useEffect(() => {
    if (!pressed) {
      setVal(clamp(value, 0, 100));
    }
  }, [value]);

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
    };
  }, []);

  return (
    <div className='slider' ref={ref}>
      <div className='bar buffered' style={{ width: `${bufferedWidth}%` }} />
      <div className='bar progress' style={{ width: `${progressedWith}%` }} />

      {interactionEvents.length && (
        <Activity
          max={bufferedWidth}
          duration={duration}
          inactivity={recording.inactivity}
          enabled={state.eventVisibility.includes('inactivity')}
        />
      )}
      
      <div className='events'>
        {interactionEvents.map((e, index) => (
          <Interaction 
            key={`${e.timestampStart}_${index}`}
            duration={duration}
            interactionEvent={e}
            offset={offset}
          />
        ))}
      </div>

      <div className='track' onMouseDown={handleClick}>
        <Button
          onMouseDown={handleMouseDown}
          className={classnames({ clicked: clicked.current })}
          style={{ left: `${val}%` }}
        />
      </div>
    </div>
  );
};
