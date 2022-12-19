import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import getConfig from 'next/config';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { parseMessage } from 'lib/messages';
import type { Feedback, Site } from 'types/graphql';

const { publicRuntimeConfig } = getConfig();

interface Props {
  site: Site;
  feedback: Feedback;
}

export const SentimentPreview: FC<Props> = ({ site, feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState<boolean>(false);

  const themeOverride = encodeURIComponent(JSON.stringify(feedback));

  const toggleShow = () => setShow(!show);

  const handleMessage = (event: MessageEvent) => {
    const message = parseMessage(event.data);

    if (message.key === '__squeaky_close_sentiment') {
      toggleShow();
    }
  };

  const handleLoad = () => {
    const spinner = document.getElementById('spinner');
    if (spinner) spinner.style.display = 'none';
  };

  React.useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage, true);
    };
  }, []);

  return (
    <>
      <Button type='button' className='icon secondary' onClick={toggleShow}>
        <Icon name='search-line' />
        {show ? 'Hide' : 'Preview'}
      </Button>

      {show && (
        <div ref={ref}>
          <div id='squeaky__sentiment_modal' key={themeOverride} className={classnames(feedback.sentimentLayout)}>
            <iframe 
              id='squeaky__sentiment_frame'
              scrolling='no'
              src={`${publicRuntimeConfig.webHost}/feedback/sentiment?site_id=${site.uuid}&demo=true&theme_overrides=${themeOverride}`}
              onLoad={handleLoad}
            />

            <button id='squeaky__sentiment_close' type='button' style={{ background: feedback.sentimentAccentColor }} onClick={toggleShow}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'>
                <path fill='none' d='M0 0h24v24H0z' />
                <path fill='#ffffff' d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
              </svg>
            </button>

            <div id='spinner'>
              <div className='icon'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'>
                  <path fill='none' d='M0 0h24v24H0z' />
                  <path fill='#0074E0' d='M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z' />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
