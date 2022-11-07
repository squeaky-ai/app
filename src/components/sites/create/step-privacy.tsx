import React from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { Label } from 'components/label';
import { Icon } from 'components/icon';
import { PrivacyAnonymising } from 'components/sites/settings/privacy-anonymising';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleBack: VoidFunction;
  handleForward: VoidFunction;
}

import privacy1 from '../../../../public/privacy/privacy-1.webp';
import privacy2 from '../../../../public/privacy/privacy-2.webp';
import privacy3 from '../../../../public/privacy/privacy-3.webp';

export const StepPrivacy: FC<Props> = ({ site, handleBack, handleForward }) => (
  <div className='step step-privacy'>
    <p className='subheading'>Put privacy first</p>
    <h4>Text and form anonymisation</h4>

    <p>Protect the privacy of your visitors by anonymising the text captured during session recordings.</p>

    <div className='site-anonymisation fade-in'>
      <Card>
        <PrivacyAnonymising site={site} quiet />
        <div className='example'>
          <Label>Example</Label>
          <div className='preview'>
            {site.anonymiseText && site.anonymiseFormInputs && (
              <Image src={privacy1} width={352} height={240} alt='Illustration of high annonymous setting' priority />
            )}
            {!site.anonymiseText && site.anonymiseFormInputs && (
              <Image src={privacy2} width={352} height={240} alt='Illustration of middle annonymous setting' priority />
            )}
            {!site.anonymiseText && !site.anonymiseFormInputs && (
              <Image src={privacy3} width={352} height={240} alt='Illustration of least annonymous setting' priority />
            )}
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
