import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Card } from 'components/card';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { PrivacyAnonymising } from 'components/sites/settings/privacy-anonymising';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleBack: VoidFunction;
  handleForward: VoidFunction;
}

export const StepPrivacy: FC<Props> = ({ site, handleBack, handleForward }) => (
  <div className='step step-privacy'>
    <p className='subheading'>Put privacy first</p>
    <h4>Text and form anonymisation</h4>

    <p>Protect the privacy of your visitors by anonymising the text captured during session recordings.</p>

    <div className='site-anonymisation fade-in'>
      <Card>
        <PrivacyAnonymising site={site} />
      </Card>

      <div className='footer'>
        <Button className='quaternary' type='button' onClick={handleBack}>
          Back
        </Button>
        <Button className='primary' type='submit'>
          Next
        </Button>
      </div>
    </div>
  </div>
);
