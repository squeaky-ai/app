import React from 'react';
import type { FC } from 'react';
import { Checkbox } from 'components/checkbox';
import { Dropdown } from 'components/dropdown';
import { allColumns } from 'lib/visitors';
import { Preferences, Preference } from 'lib/preferences';
import type { Column } from 'types/visitor';

interface Props {
  columns: Column[];
  setColumns: (columns: Column[]) => void;
}

export const VisitorsColumns: FC<Props> = ({ columns, setColumns }) => {
  const isChecked = (name: string) => {
    return !!columns.find(c => c.name === name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = allColumns.find(c => c.name === event.target.value);

    const result = event.target.checked
      ? [...columns, value]
      : columns.filter(c => c.name !== value.name);

    Preferences.setArray(Preference.VISITORS_COLUMNS, result.map(r => r.name));

    setColumns(result);
  };

  return (
    <Dropdown className='columns' button={<><i className='ri-layout-column-line' /> Columns</>}>
      <form className='filters-columns'>
        {allColumns.map(column => 
          <Checkbox 
            key={column.name}
            name='columns'
            onChange={handleChange}
            value={column.name}
            checked={isChecked(column.name)}
            disabled={column.disabled}
          >
            {column.label}
          </Checkbox>
        )}
      </form>
    </Dropdown>
  )
};
