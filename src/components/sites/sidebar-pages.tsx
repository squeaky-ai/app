import React from 'react';
import type { FC } from 'react';
import type { Recording } from 'types/recording';

interface Props {
  recording: Recording;
}

export const SidebarPages: FC<Props> = ({ recording }) => (
  <ul className='datarow'>
    {recording.pages.map((page, i) => (
      <li key={page + i}>{page}</li>
    ))}
  </ul>
);
