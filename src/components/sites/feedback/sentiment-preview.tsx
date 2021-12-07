import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import type { Feedback } from 'types/graphql';

interface Props {
  feedback: Omit<Feedback, 'npsEnabled' | 'sentimentEnabled' | 'sentimentExcludedPages'>;
}

export const SentimentPreview: FC<Props> = ({ feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState<boolean>(false);

  const toggleShow = () => setShow(!show);

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
        <div className='sentiment-preview' ref={ref}>
          <Button className={feedback.sentimentLayout}>
            <i className='ri-user-smile-line' />
            Feedback
          </Button>
        </div>
      )}
    </>
  );
};
