import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Row, Cell } from 'components/table';
import { Dropdown } from 'components/dropdown';
import { NpsResponsesDelete } from 'components/sites/feedback/nps-responses-delete';
import { toNiceDate } from 'lib/dates';
import type { FeedbackNpsResponseItem } from 'types/graphql';

interface Props {
  response: FeedbackNpsResponseItem;
}

export const NpsResponsesItem: FC<Props> = ({ response }) => {
  const router = useRouter();
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <Row>
      <Cell>
        <h4 className={classnames('score', `score-${response.score}`)}>
          {response.score}
        </h4>
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
          <NpsResponsesDelete 
            response={response}
            onClose={onRowActionClose}
          />
        </Dropdown>
      </Cell>
    </Row>
  );
};
