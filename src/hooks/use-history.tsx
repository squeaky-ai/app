import React from 'react';
import { HistoryItem, HistoryContext } from 'components/history';

interface UseHistory {
  history: HistoryItem[];
}

export const useHistory = (): UseHistory => {
  const ctx = React.useContext(HistoryContext);

  return { history: ctx.history };
};
