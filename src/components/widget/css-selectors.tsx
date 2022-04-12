import React from 'react';
import type { FC } from 'react';
import { cssSelectorBlacklistCreate, cssSelectorBlacklistDelete } from 'lib/api/graphql';
import type { Site } from 'types/graphql';
import { Button } from 'components/button';
import { Icon } from 'components/icon';

interface Props {
  site: Site;
}

type Message = {
  action: 'create' | 'delete';
  selector: string;
}

const getMessageFromEvent = (messageEvent: MessageEvent<string>): Message | null => {
  try {
    return JSON.parse(messageEvent.data);
  } catch {
    return null;
  }
};

export const CssSelectors: FC<Props> = ({ site }) => {
  const onWindowMessage = async (messageEvent: MessageEvent<string>) => {
    const message = getMessageFromEvent(messageEvent);

    if (!message) return;

    const func = message.action === 'create'
      ? cssSelectorBlacklistCreate
      : cssSelectorBlacklistDelete;

    await func({ siteId: site.id, selector: message.selector });
  };

  const handleDeleteSelector = async (selector: string) => {
    await cssSelectorBlacklistDelete({ siteId: site.id, selector })
  };

  React.useEffect(() => {
    window.addEventListener('message', onWindowMessage);

    return () => {
      window.removeEventListener('message', onWindowMessage, true);
    };
  }, []);

  return (
    <div className='selectors'>
      <p><b>Hidden on this page</b></p>
      <ul>
        {site.cssSelectorBlacklist.map(selector => (
          <li key={selector}>
            {selector}
            <Button className='delete-selector' onClick={() => handleDeleteSelector(selector)}>
              <Icon name='close-line' />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
