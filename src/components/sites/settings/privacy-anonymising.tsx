import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { anonymisePreferencesUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import { Radio } from 'components/radio';
import { Label } from 'components/label';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

import person from '../../../../public/privacy/person.jpg';
import privacy1 from '../../../../public/privacy/privacy-1.svg';
import privacy2 from '../../../../public/privacy/privacy-2.svg';
import privacy3 from '../../../../public/privacy/privacy-3.svg';
import { Icon } from 'components/icon';

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

  const isAnonymiseAll = site.anonymiseText && site.anonymiseFormInputs
  const isAnonymiseForms = !site.anonymiseText && site.anonymiseFormInputs;
  const isAnonymiseNothing = !site.anonymiseText && !site.anonymiseFormInputs;

  return (
    <div className='privacy-anonymising'>
      <div className='radio-group'>
        <Radio
          name='anonymise'
          value='all'
          onChange={handleAnonymiseAll}
          checked={isAnonymiseAll}
        >
          Anonymise all text on your site
        </Radio>
        <Radio
          name='anonymise'
          value='forms'
          onChange={handleAnonymiseForms}
          checked={isAnonymiseForms}
        >
          Anonymise form inputs
        </Radio>
        <Radio
          name='anonymise'
          value='none'
          onChange={handleAnonymiseDisable}
          checked={isAnonymiseNothing}
        >
          Turn off anonymisation
        </Radio>
      </div>

      <div className='example'>
        <Label>Example</Label>
        <div className='preview'>
          <div className={classnames('image', { show: isAnonymiseAll })}>
            <Image src={privacy1} width={352} height={240} alt='Illustration of high annonymous setting' priority unoptimized />
          </div>
          <div className={classnames('image', { show: isAnonymiseForms })}>
            <Image src={privacy2} width={352} height={240} alt='Illustration of middle annonymous setting' priority unoptimized />
          </div>
          <div className={classnames('image', { show: isAnonymiseNothing })}>
            <Image src={privacy3} width={352} height={240} alt='Illustration of least annonymous setting' priority unoptimized />
          </div>
          <div className='image person'>
            <Image src={person} width={133} height={240} alt='Image of person indicating privacy' priority unoptimized />
          </div>
        </div>
        <p><Icon name='check-line' /> Your site will always look normal to your visitors</p>
      </div>
    </div>
  );
};
