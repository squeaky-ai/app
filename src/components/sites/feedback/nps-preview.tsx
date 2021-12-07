import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import type { Feedback } from 'types/graphql';

interface Props {
  feedback: Omit<Feedback, 'npsEnabled' | 'sentimentEnabled' | 'sentimentExcludedPages'>;
}

export const NpsPreview: FC<Props> = ({ feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState<boolean>(false);

  const toggleShow = () => setShow(!show);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('style', `--nps-accent-color:${feedback.npsAccentColor};`);
    }
  });

  return (
    <>
      <Button type='button' className='icon secondary' onClick={toggleShow}>
        <i className='ri-eye-line' />
        {show ? 'Hide' : 'Preview'}
      </Button>

      {show && (
        <div ref={ref} className={classnames('nps-preview', { boxed: feedback.npsLayout === 'boxed' })}>
          <div className='nps-wrapper'>
            <Button type='button' className='close' onClick={toggleShow}>
              <i className='ri-close-line' />
            </Button>
            <p>How likely is it that you would recommend {feedback.npsPhrase} to a friend or colleague?</p>
            <div className='labels'>
              <span>Not likely</span>
              <span>Extremely likely</span>
            </div>
            <div className='options'>
              <Button type='button'>0</Button>
              <Button type='button'>1</Button>
              <Button type='button'>2</Button>
              <Button type='button'>3</Button>
              <Button type='button'>4</Button>
              <Button type='button'>5</Button>
              <Button type='button'>6</Button>
              <Button type='button'>7</Button>
              <Button type='button'>8</Button>
              <Button type='button'>9</Button>
              <Button type='button'>10</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
