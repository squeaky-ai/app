import React from 'react';
import type { FC } from 'react';
import { Label } from 'components/label';
import { Select, Option } from 'components/select';

interface Props {
  page: string;
  pages: string[];
  setPage: (page: string) => void;
}


export const HeatmapsPages: FC<Props> = ({ page, pages, setPage }) => {
  const results = [...pages].sort((a, b) => a.localeCompare(b));

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(event.target.value);
  };

  return (
    <div className='heatmaps-pages'>
      <Label htmlFor='page-search'>Page</Label>
      <Select name='page' onChange={handleChange} value={page}>
        {results.map(page => (
          <Option key={page} value={page}>
            {page}
          </Option>
        ))}
      </Select>
    </div>
  );
};
