import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { feedbackUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Feedback, Site } from 'types/graphql';

interface Props {
  site: Site;
  feedback: Feedback;
}

export const SentimentStatus: FC<Props> = ({ site, feedback }) => {
  const toasts = useToasts();

  const toggleStatus = async () => {
    try {
      await feedbackUpdate({
        siteId: site.id,
        sentimentEnabled: !feedback.sentimentEnabled
      });
      toasts.add({ type: 'success', body: `Sentiment ${feedback.sentimentEnabled ? 'Disabled' : 'Enabled'}` });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'There was an issue updating the settings' });
    }
  };

  return (
    <Button type='button' className='icon sentiment-status' onClick={toggleStatus}>
      <Icon name='eye-line' />
      Status: <span>{feedback.sentimentEnabled ? 'Live' : 'Disabled'}</span>
    </Button>
  );
};
