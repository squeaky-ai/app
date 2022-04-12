import React from 'react';
import type { FC } from 'react';
import { cssSelectorBlacklistCreate, cssSelectorBlacklistDelete } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

type Message = {
  action: 'create' | 'delete';
  selector: string;
}

export const CssSelectors: FC<Props> = ({ site }) => {
  const onWindowMessage = async (messageEvent: MessageEvent<string>) => {
    const message: Message = JSON.parse(messageEvent.data);

    const func = message.action === 'create'
      ? cssSelectorBlacklistCreate
      : cssSelectorBlacklistDelete;

    await func({ siteId: site.id, selector: message.selector });
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
          </li>
        ))}
      </ul>
    </div>
  );
};
