import type { FeedbackNpsResponseItem } from 'types/graphql';

export const npsColor = (nps: FeedbackNpsResponseItem) => {
  switch(nps.score) {
    case 7:
    case 8:
      return 'purple';
    case 9:
    case 10:
      return 'blue';
    default:
      return 'rose';
  }
};
