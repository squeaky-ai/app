import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Checkbox } from 'components/checkbox';
import { Dropdown } from 'components/dropdown';
import { STATS_COLUMNS } from 'data/events/constants';
import type { Column } from 'types/common';

interface Props {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

export const EventStatTableColumns: FC<Props> = ({ columns, setColumns }) => {
  const isChecked = (position: number) => {
    return !!columns.find(c => c.position === position);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = STATS_COLUMNS.find(c => c.position.toString() === event.target.value);

    const result = event.target.checked
      ? [...columns, value]
      : columns.filter(c => c.position !== value.position);

    setColumns(result);
  };

  return (
    <Dropdown className='menu-item columns' button={<><Icon name='layout-column-line' /> Columns</>}>
      <form className='filters-columns'>
        {STATS_COLUMNS.map(column => 
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
