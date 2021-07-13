import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { ActivityTimestamp } from 'components/sites/activity-timestamp';
import { Note as INote } from 'types/recording';

interface Props {
  note: INote;
  setProgress: (value: number) => void;
  handleDelete: (id: string) => void;
}

export const Note: FC<Props> = ({ note, setProgress, handleDelete }) => {
  return (
    <div className='note'>
      <div className='title'>
        {note.timestamp
          ? <ActivityTimestamp timestamp={note.timestamp} offset={0} setProgress={setProgress} />
          : <i className='no-timestamp'>No timestamp</i>
        }
        <Dropdown button={<i className='ri-more-2-fill' />} buttonClassName='kebab'>
          <Button>Edit</Button>
          <Button onClick={() => handleDelete(note.id)}>Delete</Button>
        </Dropdown>
      </div>
      <p className='body'>
        {note.body}
      </p>
      <p className='user'>
        <i className='ri-account-circle-line' />
        <span>{note.user.fullName}</span>
      </p>
    </div>
  );
};
