import React from 'react';
import type { FC } from 'react';
import { Select, Option } from 'components/select';

interface Props {
  page: string;
  pages: string[];
  setPage: (page: string) => void;
}


export const JourneysPages: FC<Props> = ({ page, pages, setPage }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(event.target.value);
  };

  return (
    <div className='journeys-pages'>
      <Select name='page' onChange={handleChange} value={page || ''}>
        <Option value=''>Select Page</Option>
        {pages.map(p => (
          <Option key={p} value={p}>
            {p}
          </Option>
        ))}
      </Select>
    </div>
  );
};
