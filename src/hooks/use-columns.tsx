import React from 'react';
import { getColumnPreferences } from 'lib/tables';
import { Preferences, Preference } from 'lib/preferences';
import { COLUMNS as VISITOR_COLUMNS, DEFAULT_COLUMNS as DEFAULT_VISITOR_COLUMNS } from 'data/visitors/constants';
import { COLUMNS as RECORDINGS_COLUMNS, DEFAULT_COLUMNS as DEFAULT_RECORDINGS_COLUMNS } from 'data/recordings/constants';
import { COLUMNS as NPS_COLUMNS, DEFAULT_COLUMNS as DEFAULT_NPS_COLUMNS } from 'data/nps/constants';
import { COLUMNS as SENTIMENT_COLUMNS, DEFAULT_COLUMNS as DEFAULT_SENTIMENT_COLUMNS } from 'data/sentiment/constants';
import { SITE_COLUMNS, USER_COLUMNS, DEFAULT_SITE_COLUMNS, DEFAULT_USER_COLUMNS } from 'data/admin/constants';
import type { Column } from 'types/common'

type ColumnType = 'visitors' |
                  'recordings' |
                  'sentiment' |
                  'nps' |
                  'admin-sites' |
                  'admin-users';

interface UseColumns {
  columns: Column[];
  columnsReady: boolean;
  setColumns: (columns: Column[]) => void;
}

const getDefaultColumns = (type: ColumnType): Column[] => {
  switch(type) {
    case 'visitors':
      return DEFAULT_VISITOR_COLUMNS;
    case 'recordings':
      return DEFAULT_RECORDINGS_COLUMNS;
    case 'nps':
      return DEFAULT_NPS_COLUMNS;
    case 'sentiment':
      return DEFAULT_SENTIMENT_COLUMNS;
    case 'admin-sites':
      return DEFAULT_SITE_COLUMNS;
    case 'admin-users':
      return DEFAULT_USER_COLUMNS;
  }
};

const getAllColumns = (type: ColumnType): Column[] => {
  switch(type) {
    case 'visitors':
      return VISITOR_COLUMNS;
    case 'recordings':
      return RECORDINGS_COLUMNS;
    case 'nps':
      return NPS_COLUMNS;
    case 'sentiment':
      return SENTIMENT_COLUMNS;
    case 'admin-sites':
      return SITE_COLUMNS;
    case 'admin-users':
      return USER_COLUMNS;
  }
};

const getPreference = (type: ColumnType): Preference => {
  switch(type) {
    case 'visitors':
      return Preference.VISITORS_COLUMNS;
    case 'recordings':
      return Preference.RECORDINGS_COLUMNS;
    case 'nps':
      return Preference.NPS_COLUMNS;
    case 'sentiment':
      return Preference.SENTIMENT_COLUMNS;
    case 'admin-sites':
      return Preference.ADMIN_SITES_COLUMNS;
    case 'admin-users':
      return Preference.ADMIN_USERS_COLUMNS;
  }
};

export const useColumns = (type: ColumnType): UseColumns => {
  const [columns, setColumns] = React.useState<Column[]>(getDefaultColumns(type));
  const [columnsReady, setColumnsReady] = React.useState<boolean>(false);

  const handleColumnChange = (columns: Column[]) => {
    Preferences.setArray(getPreference(type), columns.map(c => c.position));
    setColumns(columns);
  };

  React.useEffect(() => {
    getColumnPreferences(getPreference(type), getAllColumns(type), setColumns);
    setColumnsReady(true);
  }, []);

  return { 
    columns,
    columnsReady,
    setColumns: handleColumnChange,
  };
};
