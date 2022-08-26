import React from 'react';
import type { FC } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { feedbackUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { MEMBER, READ_ONLY } from 'data/teams/constants';
import type { Feedback, Site, Team } from 'types/graphql';

interface Props {
  site: Site;
  member: Team;
  feedback: Feedback;
}

export const SentimentStatus: FC<Props> = ({ site, member, feedback }) => {
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
    <Button type='button' className='icon sentiment-status' onClick={toggleStatus} unauthorized={[MEMBER, READ_ONLY].includes(member.role)}>
      <Icon name='eye-line' />
      Status: <span>{feedback.sentimentEnabled ? 'Live' : 'Disabled'}</span>
    </Button>
  );
};
