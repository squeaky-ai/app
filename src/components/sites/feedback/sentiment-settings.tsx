import React from 'react';
import type { FC } from 'react';
import { Toggle } from 'components/toggle';
import { Spinner } from 'components/spinner';
import { Error } from 'components/error';
import { useFeedback } from 'hooks/use-feedback';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import type { FeedbackUpdateMutationInput } from 'types/feedback';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

export const SentimentSettings: FC<Props> = ({ site }) => {
  const { loading, error, feedback } = useFeedback();

  const onUpdate = async (input: Partial<FeedbackUpdateMutationInput>): Promise<void> => {
    await feedbackUpdate({
      siteId: site.id,
      ...input,
    });
  };

  const onToggleEnableSentiment = async () => {
    await onUpdate({ sentimentEnabled: !feedback.sentimentEnabled });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='sentiment-settings'>
      <Toggle checked={feedback.sentimentEnabled} onChange={onToggleEnableSentiment}>
        Use Sentiment Survey
      </Toggle>

      {feedback.sentimentEnabled && (
        <Container className='md'>
          <p>...</p>
        </Container>
      )}
    </div>
  );
};
