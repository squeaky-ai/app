import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import type { EventSelected } from 'types/events';
import { Site } from 'types/graphql';

interface Props {
  site: Site;
  selected: EventSelected[];
  buttonText?: React.ReactNode;
  buttonDisabled?: boolean;
  onCompleted?: VoidFunction;
}

export const EventCompare: FC<Props> = ({ site, selected, buttonText, buttonDisabled, onCompleted }) => {
  const router = useRouter();

  const handleClick = () => {
    const search = new URLSearchParams();
    selected.forEach(s => search.append(`${s.type}Id`, s.id));

    router.push(`/sites/${site.id}/events/history?${search.toString()}`);

    onCompleted?.();
  };

  return (
    <Button className='link event-compare' onClick={handleClick} disabled={buttonDisabled || false}>
      {buttonText || 'Compare events'}
    </Button>
  );
};
