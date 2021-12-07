import { Preferences, Preference } from 'lib/preferences';
import { Column } from 'types/common';

export function getColumnPreferences(
  preference: Preference,
  columns: Column[], 
  callback: (cols: Column[]) => void,
) {
  try {
    const existing = Preferences.getArray(preference);

    if (existing.length > 0) {
      const cols = existing.map(e => {
        const col = columns.find(a => a.position === e);
        // If we remove a column or change something then the
        // user will have crashes with no way of us fixing it.
        // By throwing and clearing it out we can make changes
        // without worrying about breaking
        if (!col) throw new Error('Col is missing');
        return col;
      });
      callback(cols);
    }
  } catch {
    // We probably have a breaking change, so wipe it
    Preferences.delete(preference);
  }
}

export function getColumnStyles(
  allColumns: Column[], 
  selectedColumns: Column[],
) {
  const rowStyle: React.CSSProperties = { 
    gridTemplateColumns: allColumns
      .map(column => selectedColumns.find(c => c.position === column.position)?.width || '')
      .join(' ')
  };

  const tableClassNames = allColumns
    .map(column => selectedColumns.find(c => c.position === column.position) ? '' : `hide-cell-${column.position}`);

  return { tableClassNames, rowStyle };
}
