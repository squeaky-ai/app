import React from 'react';
import type { FC } from 'react';
import { anonymisePreferencesUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { Radio } from 'components/radio';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

export const PrivacyAnonymising: FC<Props> = ({ site }) => {
  const toasts = useToasts();

  const toggleAnonymiseFormInputsEnabled = async (text: boolean, forms: boolean) => {
    try {
      await anonymisePreferencesUpdate({ 
        siteId: site.id,
        formsEnabled: forms,
        textEnabled: text,
      });
      toasts.add({ type: 'success', body: 'Your preferences have been updated' });
    } catch(error) {
      console.error(error);
      toasts.add({ type: 'error', body: 'There was an issue updating your preferences' });
    }
  };

  const handleAnonymiseAll = () => toggleAnonymiseFormInputsEnabled(true, true);

  const handleAnonymiseForms = () => toggleAnonymiseFormInputsEnabled(false, true);

  const handleAnonymiseDisable = () => toggleAnonymiseFormInputsEnabled(false, false);

  return (
    <div className='radio-group'>
      <Radio
        name='anonymise'
        value='all'
        onChange={handleAnonymiseAll}
        checked={site.anonymiseText && site.anonymiseFormInputs}
      >
        Anonymise all text on your site
      </Radio>
      <Radio
        name='anonymise'
        value='forms'
        onChange={handleAnonymiseForms}
        checked={!site.anonymiseText && site.anonymiseFormInputs}
      >
        Anonymise form inputs <i>(default)</i>
      </Radio>
      <Radio
        name='anonymise'
        value='none'
        onChange={handleAnonymiseDisable}
        checked={!site.anonymiseText && !site.anonymiseFormInputs}
      >
        Turn off anonymisation
      </Radio>
    </div>
  )
};
