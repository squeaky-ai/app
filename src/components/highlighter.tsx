import React from 'react';
import type { FC } from 'react';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  value: string;
}

export const Highlighter: FC<Props> = ({ value, children }) => {
  if (value === '' || value.length < 3) {
    return <>{children}</>;
  }

  const chunks = children.toString().split(new RegExp(`(${value})`, 'gi'));
 
  return (
    <span className='highlighter'>
      {chunks.map((part, index) => (
        <span key={part + index}>
          {part.toLowerCase() === value.toLowerCase() ? <b>{part}</b> : part}
        </span>
      ))}
    </span>
  );
};
