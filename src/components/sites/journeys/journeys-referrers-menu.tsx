import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';

interface Props {
  pinned: boolean;
  referrer: string;
  pinDisabled: boolean;
  setPinnedReferrer: (referrer: string | null) => void;
}

export const JourneyReferrersMenu: FC<Props> = ({
  pinned,
  referrer,
  pinDisabled,
  setPinnedReferrer,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTogglePin = () => {
    setOpen(false);
    setPinnedReferrer(pinned ? null : referrer);
  };

  return (
    <div className='menu'>
      <Button onClick={handleClick} className='open-menu'>
        <Icon name='more-2-fill' />
      </Button>

      {open && (
        <div className='page-actions dropdown-menu'>
          <Button onClick={handleTogglePin} disabled={pinDisabled}>
            {pinned ? 'Unpin' : 'Pin'} traffic source
          </Button>
        </div>
      )}
    </div>
  );
};
