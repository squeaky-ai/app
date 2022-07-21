import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { range } from 'lodash';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { TextArea } from 'components/textarea';
import { Logo } from 'components/logo';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Replacements, t as translation } from 'lib/t';
import type { Feedback } from 'types/graphql';

interface Props {
  feedback: Omit<Feedback, 'id' | 'npsEnabled' | 'sentimentEnabled' | 'sentimentExcludedPages' | 'sentimentDevices'>;
}

export const NpsPreview: FC<Props> = ({ feedback }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState<number>(1);
  const [show, setShow] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<boolean>(false);

  const t = (key: string, replacements?: Replacements) => translation(
    'feedback',
    key,
    replacements,
    feedback.npsLanguages,
    feedback.npsLanguagesDefault,
  );

  const toggleShow = () => {
    setPage(0);
    setShow(!show);
  };

  const handleRatingChange = () => {
    if (page !== 0) return;

    setPage(feedback.npsFollowUpEnabled ? 1 : 2);
  };

  const handleNextPage = () => {
    if (page === 1 && !feedback.npsContactConsentEnabled) {
      return setPage(2);
    }

    if (page === 1 && !contact) {
      return setPage(2);
    }

    setPage(page + 1);
  };

  const handleClose = () => {
    setShow(false);
    setPage(0);
    setContact(false);
  };

  React.useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('style', `--nps-accent-color:${feedback.npsAccentColor};`);
    }
  });

  return (
    <>
      <Button type='button' className='icon' onClick={toggleShow}>
        <Icon name='search-line' />
        {show ? 'Hide' : 'Preview'}
      </Button>

      {show && (
        <div ref={ref} className={classnames('nps-preview', { boxed: feedback.npsLayout === 'boxed' })}>
          <div className='nps-wrapper'>
            <Button type='button' className='close' onClick={toggleShow}>
              <Icon name='close-line' />
            </Button>

            {page < 2 && (
              <div className={`page-${page}`}>
                <p className='heading'>{t('how_likely_to_recommend', { name: feedback.npsPhrase })}</p>

                <div className='labels'>
                  <span>{t('not_likely')}</span>
                  <span>{t('extremely_likely')}</span>
                </div>

                <div className='options'>
                  {range(0, 11).map(i => (
                    <Label key={i} onClick={handleRatingChange}>
                      <input type='radio' name='rating' value={i} />
                      <span className='rating'>{i}</span>
                    </Label>
                  ))}
                </div>

                <div className='reason'>
                  <Label>{t('what_is_the_main_reason')}</Label>
                  <TextArea placeholder='Please type here ...' />
                </div>
                
                {feedback.npsContactConsentEnabled && (
                  <div className='respond'>
                    <Label>{t('would_you_like_to_hear')}</Label>
                    <div className='radio-group'>
                      <Radio name='contact' checked={contact} onChange={() => setContact(true)}>
                      {t('yes')}
                      </Radio>
                      <Radio name='contact' checked={!contact} onChange={() => setContact(false)}>
                        {t('no')}
                      </Radio>
                    </div>
                  </div>
                )}

                {contact && (
                  <div className='email'>
                    <Label>{t('email_address')}</Label>
                    <Input 
                      placeholder='e.g. jess@squeaky.ai'
                      autoComplete='email'
                    />
                  </div>
                )}

                <div className='footer'>
                  <p>
                    Powered by
                    <span className='logo'>
                      <Logo logo='dark' height={20} width={64} />
                    </span>
                  </p>
                  <Button type='button' className='primary' onClick={handleNextPage}>
                    {t('submit')}
                  </Button>
                </div>
              </div>
            )}

            {page === 2 && (
              <div className='page-2'>
                <Icon name='checkbox-circle-line' />
                <h4>{t('feedback_sent')}</h4>
                <p>{t('thanks_for_sharing')}</p>
                <Button type='button' className='secondary' onClick={handleClose}>
                  {t('close')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
