import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import type { Feedback } from 'types/graphql';

interface Props {
  feedback: Omit<Feedback, 'npsEnabled' | 'sentimentEnabled' | 'sentimentExcludedPages'>;
}

export const SentimentPreview: FC<Props> = ({ feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleShow = () => setShow(!show);

  const toggleOpen = () => setOpen(!open);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('style', `--sentiment-accent-color:${feedback.sentimentAccentColor};`);
    }
  });

  return (
    <>
      <Button type='button' className='icon secondary' onClick={toggleShow}>
        <i className='ri-eye-line' />
        {show ? 'Hide' : 'Preview'}
      </Button>

      {show && (
        <div className={classnames('sentiment-preview', feedback.sentimentLayout)} ref={ref}>
          <Button type='button' className='open' onClick={toggleOpen}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20'>
              <path d='M12 22a10 10 0 1 1 0-20 10 10 0 1 1 0 20zm-5-9a5 5 0 0 0 5 5 5 5 0 0 0 5-5h-2a3 3 0 0 1-3 3 3 3 0 0 1-3-3H7zm1-2a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 8 8a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 8 11zm8 0a1.5 1.5 0 0 0 1.5-1.5A1.5 1.5 0 0 0 16 8a1.5 1.5 0 0 0-1.5 1.5A1.5 1.5 0 0 0 16 11z' fill='#fff' opacity='.65' />
            </svg>
            Feedback
          </Button>

          {open && (
            <div className='popout'>
              <Button type='button' className='close' onClick={toggleOpen}>
                <i className='ri-close-line' />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
