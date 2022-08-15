import React from 'react';
import type { FC } from 'react';
import { omit } from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { Button } from 'components/button';
import { getLinkedData } from 'lib/visitors';
import { useToasts } from 'hooks/use-toasts';
import { GET_VISITOR_EXPORT_QUERY } from 'data/visitors/queries';
import type { FeedbackNpsResponseItem, FeedbackSentimentResponseItem, Site, Visitor } from 'types/graphql';

interface Props {
  site: Site;
  visitor: Visitor;
}

export const VisitorsExport: FC<Props> = ({ site, visitor }) => {
  const toasts = useToasts();

  const [getExport, { loading }] = useLazyQuery<{ site: Site }>(GET_VISITOR_EXPORT_QUERY, {
    variables: {
      siteId: site.id,
      visitorId: visitor.id,
    },
  });

  const stripTypename = (object: FeedbackNpsResponseItem | FeedbackSentimentResponseItem) => {
    return omit(object, '__typename');
  };

  const handleClick = async () => {
    try {
      const { data } = await getExport();
      const response = data.site.visitor.export;

      const visitorData = JSON.stringify({
        number_of_recordings: response.recordingsCount,
        feedback: [
          ...response.npsFeedback.map(stripTypename),
          ...response.sentimentFeedback.map(stripTypename),
        ],
        linkedData: getLinkedData(response),
      }, null, 4);

      const blob = new Blob([visitorData], { type: 'application/json' });

      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = `${visitor.visitorId}.json`;
      
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'Failed to export visitor data' });
    }
  };

  return (
    <Button className='secondary' disabled={loading} onClick={handleClick}>
      Export .json
    </Button>
  )
};
