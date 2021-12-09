import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import { range } from 'lodash';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { TextArea } from 'components/textarea';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import type { Feedback } from 'types/graphql';

interface Props {
  feedback: Omit<Feedback, 'npsEnabled' | 'sentimentEnabled' | 'sentimentExcludedPages'>;
}

export const NpsPreview: FC<Props> = ({ feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState<number>(0);
  const [show, setShow] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<boolean>(false);

  const toggleShow = () => {
    setPage(0);
    setShow(!show);
  };

  const handleNextPage = () => {
    if (page === 0 && !feedback.npsFollowUpEnabled) {
      return setPage(5);
    }

    if (page === 1 && !feedback.npsContactConsentEnabled) {
      return setPage(5);
    }

    if (page === 2 && !contact) {
      return setPage(5);
    }

    if (page === 3) {
      return setPage(5);
    }

    setPage(page + 1);
  };

  const handleClose = () => {
    setShow(false);
    setPage(0);
  };

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
            {page === 0 && (
              <div className='page-0'>
                <p>How likely is it that you would recommend {feedback.npsPhrase} to a friend or colleague?</p>
                <div className='labels'>
                  <span>Not likely</span>
                  <span>Extremely likely</span>
                </div>
                <div className='options'>
                  {range(0, 10).map(i => (
                    <Button type='button' key={i} onClick={handleNextPage}>
                      {i}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {[1, 2, 3].includes(page) && (
              <div className='page-1'>
                <div className='options'>
                  {range(0, 10).map(i => (
                    <Button type='button' key={i} onClick={handleNextPage}>
                      {i}
                    </Button>
                  ))}
                </div>
                <div className='reason'>
                  <Label>What’s the main reason for your score?</Label>
                  <TextArea placeholder='Please type here ...' />
                </div>
                {[2, 3].includes(page) && (
                  <div className='reason'>
                    <Label>Would you like to here back from us regarding your feedback?</Label>
                    <div className='radio-group'>
                      <Radio name='contact' checked={contact} onChange={() => setContact(true)}>
                        Yes
                      </Radio>
                      <Radio name='contact' checked={!contact} onChange={() => setContact(false)}>
                        No
                      </Radio>
                    </div>
                  </div>
                )}
                {[3].includes(page) && (
                  <div className='reason'>
                    <Label>Email address</Label>
                    <Input placeholder='e.g. jess@squeaky.ai' />
                  </div>
                )}
                <div className='footer'>
                  <p>
                    Powered by
                    <span className='logo'>
                      <Image src='/logo.svg' height={20} width={64} />
                    </span>
                  </p>
                  <Button type='button' className='primary' onClick={handleNextPage}>
                    Submit
                  </Button>
                </div>
              </div>
            )}

            {page === 5 && (
              <div className='page-5'>
                <i className='ri-checkbox-circle-line' />
                <h4>Feedback sent</h4>
                <p>Thank you for sharing your feedback and helping to make our service better.</p>
                <Button type='button' className='secondary' onClick={handleClose}>
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
