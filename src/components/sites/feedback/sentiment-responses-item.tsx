import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Row, Cell } from 'components/table';
import { Dropdown } from 'components/dropdown';
import { SentimentResponsesDelete } from 'components/sites/feedback/sentiment-responses-delete';
import { toNiceDate } from 'lib/dates';
import { EMOJIS } from 'data/sentiment/constants';
import type { FeedbackSentimentResponseItem } from 'types/graphql';

interface Props {
  response: FeedbackSentimentResponseItem;
}

export const SentimentResponsesItem: FC<Props> = ({ response }) => {
  const router = useRouter();
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row>
      <Cell>
        <p className='score'>
          <div className='emoji'>
            <Image src={EMOJIS[response.score]} height={24} width={24} />
          </div>
        </p>
      </Cell>
      <Cell>
        <Link href={`/sites/${router.query.site_id}/visitors/${response.visitor.id}`}>
          <a>
            {response.visitor.visitorId}
          </a>
        </Link>
      </Cell>
      <Cell>
        <i className='ri-play-fill play' />
        <Link href={`/sites/${router.query.site_id}/recordings/${response.recordingId}`}>
          <a>
            {response.sessionId}
          </a>
        </Link>
      </Cell>
      <Cell>
        {toNiceDate(new Date(response.timestamp).valueOf())}
      </Cell>
      <Cell>
        {response.comment || '-'}
      </Cell>
      <Cell>
        <Dropdown portal button={<i className='ri-more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <SentimentResponsesDelete 
            response={response}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
