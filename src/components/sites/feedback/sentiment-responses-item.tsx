import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Icon } from 'components/icon';
import { Row, Cell } from 'components/table';
import { Device } from 'components/device';
import { Browser } from 'components/browser';
import { Tooltip } from 'components/tooltip';
import { Dropdown } from 'components/dropdown';
import { Emoji, EmojiType } from 'components/emoji';
import { SentimentResponsesDelete } from 'components/sites/feedback/sentiment-responses-delete';
import type { FeedbackSentimentResponseItem, Team } from 'types/graphql';

interface Props {
  member?: Team;
  response: FeedbackSentimentResponseItem;
  style?: React.CSSProperties;
}

export const SentimentResponsesItem: FC<Props> = ({ member, response, style }) => {
  const router = useRouter();
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row style={style}>
      <Cell>
        <p className='score'>
          <span className='emoji'>
            <Emoji emoji={`emoji-${response.score + 1}` as EmojiType} height={24} width={24} />
          </span>
        </p>
      </Cell>
      <Cell>
        <Link href={`/sites/${router.query.site_id}/visitors/${response.visitor.id}`}>
          {response.visitor.visitorId}
        </Link>
      </Cell>
      <Cell>
        <Icon name='play-fill play' />
        <Link href={`/sites/${router.query.site_id}/recordings/${response.recordingId}`}>
          {response.sessionId}
        </Link>
      </Cell>
      <Cell>
        {response.timestamp.niceDateTime}
      </Cell>
      <Cell>
        {response.comment && (
          <Tooltip button={response.comment} portalClassName='sentiment-comment-tooltip'>
            {response.comment}
          </Tooltip>
        )}

        {!response.comment && '-'}
      </Cell>
      <Cell>
        <Tooltip positionX='right' button={<Device deviceType={response.device.deviceType} />}>
          {response.device.deviceType === 'Computer' ? 'Desktop or Laptop Device' : 'Mobile Device'}
        </Tooltip>
        {response.device.viewportX} x {response.device.viewportY}
      </Cell>
      <Cell>
        <Tooltip positionX='right' className='browser-tooltip' button={<Browser name={response.device.browserName} height={24} width={24} />}>
          {response.device.browserDetails}
        </Tooltip>
      </Cell>
      <Cell>
        <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
          <SentimentResponsesDelete 
            member={member}
            response={response}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
