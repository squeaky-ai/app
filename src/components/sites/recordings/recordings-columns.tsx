import React from 'react';
import type { FC } from 'react';
import { Checkbox } from 'components/checkbox';
import { Dropdown } from 'components/dropdown';
import { COLUMNS } from 'data/recordings/constants';
import { Preferences, Preference } from 'lib/preferences';
import type { Column } from 'types/common';

interface Props {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

export const RecordingsColumns: FC<Props> = ({ columns, setColumns }) => {
  const isChecked = (position: number) => {
    return !!columns.find(c => c.position === position);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = COLUMNS.find(c => c.position.toString() === event.target.value);

    const result = event.target.checked
      ? [...columns, value]
      : columns.filter(c => c.position !== value.position);

    Preferences.setArray(Preference.RECORDINGS_COLUMNS, result.map(r => r.position));

    setColumns(result);
  };

  return (
    <Dropdown className='columns' button={<><i className='ri-layout-column-line' /> Columns</>}>
      <form className='filters-columns'>
        {COLUMNS.map(column => 
          <Checkbox 
            key={column.position}
            name='columns'
            onChange={handleChange}
            value={column.position}
            checked={isChecked(column.position)}
            disabled={column.disabled}
          >
            {column.label}
          </Checkbox>
        )}
      </form>
    </Dropdown>
  )
};