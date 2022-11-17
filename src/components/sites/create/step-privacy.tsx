import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Radio } from 'components/radio';
import { Icon } from 'components/icon';
import { anonymisePreferencesUpdate } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleBack: VoidFunction;
  handleForward: VoidFunction;
}

import person from '../../../../public/privacy/person.jpg';
import privacy1 from '../../../../public/privacy/privacy-1.svg';
import privacy2 from '../../../../public/privacy/privacy-2.svg';
import privacy3 from '../../../../public/privacy/privacy-3.svg';

export const StepPrivacy: FC<Props> = ({ site, handleBack, handleForward }) => {
  const toggleAnonymiseFormInputsEnabled = async (text: boolean, forms: boolean) => {
    await anonymisePreferencesUpdate({ 
      siteId: site.id,
      formsEnabled: forms,
      textEnabled: text,
    });
  };

  const handleAnonymiseAll = () => toggleAnonymiseFormInputsEnabled(true, true);

  const handleAnonymiseForms = () => toggleAnonymiseFormInputsEnabled(false, true);

  const handleAnonymiseDisable = () => toggleAnonymiseFormInputsEnabled(false, false);

  return (
    <div className='step step-privacy'>
      <p className='subheading'>Put privacy first</p>
      <h4>Text and form anonymisation</h4>
      <div className='details'>
        <p>Protect the privacy of your visitors by anonymising the text captured during session recordings.</p>
      </div>

      <div className='site-anonymisation fade-in'>
        <Card>
          <div className='radio-group'>
            <Radio
              name='anonymise'
              value='all'
              onChange={handleAnonymiseAll}
              checkIcon='check-line'
              className='check-radio'
              checked={site.anonymiseText && site.anonymiseFormInputs}
            >
              Anonymise all text on your site
            </Radio>
            <Radio
              name='anonymise'
              value='forms'
              onChange={handleAnonymiseForms}
              checkIcon='check-line'
              className='check-radio'
              checked={!site.anonymiseText && site.anonymiseFormInputs}
            >
              Anonymise form inputs
            </Radio>
            <Radio
              name='anonymise'
              value='none'
              onChange={handleAnonymiseDisable}
              checkIcon='check-line'
              className='check-radio'
              checked={!site.anonymiseText && !site.anonymiseFormInputs}
            >
              Turn off anonymisation
            </Radio>
          </div>
          <div className='example'>
            <Label>Example</Label>
            <div className='preview'>
              <div className={classnames('image', { show: site.anonymiseText && site.anonymiseFormInputs })}>
                <Image src={privacy1} width={352} height={240} alt='Illustration of high annonymous setting' priority unoptimized />
              </div>
              <div className={classnames('image', { show: !site.anonymiseText && site.anonymiseFormInputs })}>
                <Image src={privacy2} width={352} height={240} alt='Illustration of middle annonymous setting' priority unoptimized />
              </div>
              <div className={classnames('image', { show: !site.anonymiseText && !site.anonymiseFormInputs })}>
                <Image src={privacy3} width={352} height={240} alt='Illustration of least annonymous setting' priority unoptimized />
              </div>
              <div className='image person'>
                <Image src={person} width={133} height={240} alt='Image of person indicating privacy' priority unoptimized />
              </div>
            </div>
            <p><Icon name='check-line' /> Your site will always look normal to your visitors</p>
          </div>
        </Card>

        <div className='footer'>
          <Button className='quaternary' type='button' onClick={handleBack}>
            Back
          </Button>
          <Button className='primary' type='button' onClick={handleForward}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
