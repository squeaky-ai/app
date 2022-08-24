import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Emoji } from 'components/emoji';
import { TextArea } from 'components/textarea';
import { Logo } from 'components/logo';
import { Label } from 'components/label';
import type { Feedback } from 'types/graphql';
import type { SupportedLanguages } from 'types/translations';

interface Props {
  locale: SupportedLanguages;
  feedback: Feedback;
  setLocale: (locale: SupportedLanguages) => void;
}

export const SentimentPreview: FC<Props> = ({ feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(0);

  const toggleShow = () => setShow(!show);

  const toggleOpen = () => {
    setPage(0);
    setOpen(!open);
  };

  React.useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('style', `--sentiment-accent-color:${feedback.sentimentAccentColor};`);
    }
  });

  return (
    <>
      <Button type='button' className='icon secondary' onClick={toggleShow}>
        <Icon name='search-line' />
        {show ? 'Hide' : 'Preview'}
      </Button>

      {show && (
        <div className={classnames('sentiment-preview', feedback.sentimentLayout, { 'hidden-logo': feedback.sentimentHideLogo })} ref={ref}>
          <Button type='button' className={classnames('open', { show: open })} onClick={toggleOpen}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'>
              <path d='M12 22a10 10 0 1 1 0-20 10 10 0 1 1 0 20zm-5-9a5 5 0 0 0 5 5 5 5 0 0 0 5-5h-2a3 3 0 0 1-3 3 3 3 0 0 1-3-3H7zm1-2a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 8 8a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 8 11zm8 0a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 16 8a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 16 11z' fill='#fff' opacity='.65' />
            </svg>
            Feedback
          </Button>

          {open && (
            <div className='popout'>
              <Button type='button' className='close' onClick={toggleOpen}>
                <Icon name='close-line' />
              </Button>

              {[0, 1].includes(page) && (
                <div className={`page-${page}`}>
                  <p className='heading'>How would you rate your experience?</p>

                  <div className='emojis'>
                    <Label onClick={() => setPage(1)}>
                      <input type='radio' name='rating' value='0' /> 
                      <div className='image'>
                        <Emoji emoji='emoji-1' height={32} width={32} />
                      </div>
                    </Label>
                    <Label onClick={() => setPage(1)}>
                      <input type='radio' name='rating' value='1' /> 
                      <div className='image'>
                        <Emoji emoji='emoji-2' height={32} width={32} />
                      </div>
                    </Label>
                    <Label onClick={() => setPage(1)}>
                      <input type='radio' name='rating' value='2' /> 
                      <div className='image'>
                        <Emoji emoji='emoji-3' height={32} width={32} />
                      </div>
                    </Label>
                    <Label onClick={() => setPage(1)}>
                      <input type='radio' name='rating' value='3' /> 
                      <div className='image'>
                        <Emoji emoji='emoji-4' height={32} width={32} />
                      </div>
                    </Label>
                    <Label onClick={() => setPage(1)}>
                      <input type='radio' name='rating' value='4' /> 
                      <div className='image'>
                        <Emoji emoji='emoji-5' height={32} width={32} />
                      </div>
                    </Label>
                  </div>

                  <TextArea placeholder='Tell us about your experience...' />

                  <div className='footer'>
                    <p className={classnames({ hide: feedback.sentimentHideLogo })}>
                      Powered by
                      <span className='logo'>
                        <Logo logo='dark' height={20} width={64} />
                      </span>
                    </p>
                    <Button type='button' className='primary' onClick={() => setPage(2)}>
                      Submit
                    </Button>
                  </div>
                </div>
              )}

              {[2].includes(page) && (
                <div className='page-2'>
                  <Icon name='checkbox-circle-line' />
                  <h4>Feedback sent</h4>
                  <p>Thank you for sharing your feedback and helping to make our service better.</p>
                  <Button type='button' className='secondary' onClick={toggleOpen}>
                    Close
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};
