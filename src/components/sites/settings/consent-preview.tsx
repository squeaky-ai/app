import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import getConfig from 'next/config';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { parseMessage } from 'lib/messages';
import type { Consent, Site } from 'types/graphql';

const { publicRuntimeConfig } = getConfig();

interface Props {
  site: Site;
  consent: Consent;
  buttonIcon?: string;
  buttonClassName?: string;
}

export const ConsentPreview: FC<Props> = ({
  site,
  consent,
  buttonIcon,
  buttonClassName,
}) => {
  const [show, setShow] = React.useState<boolean>(false);

  const toggleShow = () => setShow(s => !s);

  const themeOverride = encodeURIComponent(JSON.stringify(consent));

  const handleSetHeight = (height: number) => {
    const form = document.getElementById('squeaky__consent_form');

    if (!form) return;

    form.style.height = `${height}px`;
  };

  const handleMessage = (event: MessageEvent) => {
    const message = parseMessage(event.data);

    if (message.key === '__squeaky_accept_consent') {
      toggleShow();
    }

    if (message.key === '__squeaky_reject_consent') {
      toggleShow();
    }

    if (message.key === '__squeaky_set_height_consent') {
      handleSetHeight(message.value.height);
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
      <Button type='button' className={classnames(buttonClassName || 'secondary', 'preview')} onClick={toggleShow}>
        <Icon name={buttonIcon || 'search-line'} />
        <span className='text'>{show ? 'Hide' : 'Preview'}</span>
      </Button>

      {show && (
        <div id='squeaky__consent_form' key={themeOverride} className={classnames(consent.layout)}>
          <div id='spinner'>
            <div className='icon'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='32' height='32'>
                <path fill='none' d='M0 0h24v24H0z' />
                <path fill='#0074E0' d='M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12h2a9 9 0 1 1-2.636-6.364z' />
              </svg>
            </div>
          </div>

          <button id='squeaky__consent_close' type='button' onClick={toggleShow}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'>
              <path fill='none' d='M0 0h24v24H0z' />
              <path fill='#ffffff' d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' />
            </svg>
          </button>

          <iframe
            id='squeaky__consent_frame'
            scrolling='no'
            src={`${publicRuntimeConfig.webHost}/feedback/consent?site_id=?${site.uuid}&themeOverride=${themeOverride}`}
            onLoad={handleLoad}
          />
        </div>
      )}
    </>
  );
};
