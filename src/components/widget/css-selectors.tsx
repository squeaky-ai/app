import React from 'react';
import type { FC } from 'react';
import { cssSelectorBlacklistUpdate } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const CssSelectors: FC<Props> = ({ site }) => {
  const onWindowMessage = async (message: MessageEvent<string>) => {
    const selector = message.data;

    await cssSelectorBlacklistUpdate({ 
      siteId: site.id, 
      selectors: [selector] 
    });
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
