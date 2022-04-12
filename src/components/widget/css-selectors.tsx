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
  const onWindowMessage = async (message: MessageEvent<Message>) => {
    const { action, selector } = message.data;

    const func = action === 'create'
      ? cssSelectorBlacklistCreate
      : cssSelectorBlacklistDelete;

    await func({ siteId: site.id, selector });
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
