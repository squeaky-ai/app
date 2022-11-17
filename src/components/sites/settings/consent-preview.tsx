import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Select, Option } from 'components/select';
import { Button } from 'components/button';
import type { Consent } from 'types/graphql';
import type { SupportedLanguages } from 'types/translations';

interface Props {
  consent: Consent;
  storedConsent: Consent;
  locale: SupportedLanguages;
  buttonIcon?: string;
  buttonClassName?: string;
  setLocale: (locale: SupportedLanguages) => void;
}

export const ConsentPreview: FC<Props> = ({
  locale,
  storedConsent,
  consent,
  buttonIcon,
  buttonClassName,
  setLocale 
}) => {
  const [show, setShow] = React.useState<boolean>(false);
  const [expand, setExpand] = React.useState<boolean>(false);

  const toggleShow = () => setShow(!show);
  const toggleExpand = () => setExpand(!expand);

  const translations = JSON.parse(consent.translations);

  const onLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as SupportedLanguages);
  };

  return (
    <>
      <Button type='button' className={classnames(buttonClassName || 'secondary', 'preview')} onClick={toggleShow}>
        <Icon name={buttonIcon || 'search-line'} />
        <span className='text'>{show ? 'Hide' : 'Preview'}</span>
      </Button>

      {show && (
        <div className={classnames('consent-preview', consent.layout)}>
          <h5>{translations.privacy_friendly_analytics}</h5>

          <p>
            {/** A hack so we don't need to refetch translations */}
            {storedConsent.name === consent.name
              ? translations.we_use_squeaky
              : translations.we_use_squeaky.replace(storedConsent.name, consent.name) 
            }
          </p>
          <p dangerouslySetInnerHTML={{ __html: translations.set_consent_preferemces }}></p>

          {consent.languages.length > 1 && (
            <div className='locale'>
              <Icon name='translate' className='translation-icon' />
              <Select value={locale || consent.languagesDefault} onChange={onLocaleChange}>
                {consent.languages.map(languages => (
                  <Option key={languages} value={languages}>
                    {languages}
                  </Option>
                ))}
              </Select>
            </div>
          )}

          <Button type='button' className={classnames('link', { expand })} onClick={toggleExpand}>
            {translations.what_makes_squeaky_different}
            <Icon name='arrow-drop-down-line' />
          </Button>

          {expand && (
            <ul>
              <li>{translations.no_cookies}</li>
              <li>{translations.never_sold}</li>
              <li>{translations.data_capture_features}</li>
              <li>{translations.visitors_are_anonymous}</li>
              <li>{translations.data_in_eu}</li>
            </ul>
          )}

          <div className='actions'>
            <Button className='primary' onClick={toggleShow}>
              {translations.accept}
            </Button>
            <Button className='secondary' onClick={toggleShow}>
              {translations.reject}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
