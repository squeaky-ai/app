import React from 'react';
import { HistoryContext } from 'components/history';

interface UseHistory {
  history: string[];
}

export const useHistory = (): UseHistory => {
  const ctx = React.useContext(HistoryContext);

  return { history: ctx.history };
};
