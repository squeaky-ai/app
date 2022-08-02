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
import { Select, Option } from 'components/select';
import type { Feedback } from 'types/graphql';
import type { SupportedLanguages } from 'types/translations';

interface Props {
  locale: SupportedLanguages;
  feedback: Omit<Feedback, 'id' | 'npsEnabled' | 'sentimentEnabled' | 'sentimentExcludedPages' | 'sentimentDevices'>;
  setLocale: (locale: SupportedLanguages) => void;
}

export const NpsPreview: FC<Props> = ({ locale, feedback, setLocale }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [page, setPage] = React.useState<number>(1);
  const [show, setShow] = React.useState<boolean>(false);
  const [contact, setContact] = React.useState<boolean>(false);

  const translations = JSON.parse(feedback.npsTranslations);

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

  const onLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLanguages);
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
            {feedback.npsLanguages.length > 1 && (
              <div className='locale'>
                <Icon name='translate' className='translation-icon' />
                <Select value={locale || feedback.npsLanguagesDefault} onChange={onLocaleChange}>
                  {feedback.npsLanguages.map(npsLanguage => (
                    <Option key={npsLanguage} value={npsLanguage}>
                      {npsLanguage}
                    </Option>
                  ))}
                </Select>
              </div>
            )}

            <Button type='button' className='close' onClick={toggleShow}>
              <Icon name='close-line' />
            </Button>

            {page < 2 && (
              <div className={`page-${page}`}>
                <p className='heading'>{translations.how_likely_to_recommend}</p>

                <div className='labels'>
                  <span>{translations.not_likely}</span>
                  <span>{translations.extremely_likely}</span>
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
                  <Label>{translations.what_is_the_main_reason}</Label>
                  <TextArea placeholder='Please type here ...' />
                </div>
                
                {feedback.npsContactConsentEnabled && (
                  <div className='respond'>
                    <Label>{translations.would_you_like_to_hear}</Label>
                    <div className='radio-group'>
                      <Radio name='contact' checked={contact} onChange={() => setContact(true)}>
                      {translations.yes}
                      </Radio>
                      <Radio name='contact' checked={!contact} onChange={() => setContact(false)}>
                        {translations.no}
                      </Radio>
                    </div>
                  </div>
                )}

                {contact && (
                  <div className='email'>
                    <Label>{translations.email_address}</Label>
                    <Input 
                      placeholder='e.g. jess@squeaky.ai'
                      autoComplete='email'
                    />
                  </div>
                )}

                <div className='footer'>
                  <p>
                    {translations.powered_by}
                    <span className='logo'>
                      <Logo logo='dark' height={20} width={64} />
                    </span>
                  </p>
                  <Button type='button' className='primary' onClick={handleNextPage}>
                    {translations.submit}
                  </Button>
                </div>
              </div>
            )}

            {page === 2 && (
              <div className='page-2'>
                <Icon name='checkbox-circle-line' />
                <h4>{translations.feedback_sent}</h4>
                <p>{translations.thanks_for_sharing}</p>
                <Button type='button' className='secondary' onClick={handleClose}>
                  {translations.close}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
