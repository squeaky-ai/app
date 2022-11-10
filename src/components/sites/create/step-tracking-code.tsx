import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleBack: VoidFunction;
  handleForward: VoidFunction;
  handleSuccess: VoidFunction;
}

enum InstallOptions {
  MANUAL = 0,
  GUIDE = 1,
  DEVELOPER = 2, 
}

export const StepTrackingCode: FC<Props> = ({ site, handleForward, handleBack, handleSuccess }) => {
  const [selectedOption, setSelectedOption] = React.useState<InstallOptions>(null);

  const handleReturnToSelection = () => setSelectedOption(null);

  return (
    <div className='step step-tracking-code'>
      {selectedOption === null && ( 
        <>
          <h4>Install Squeaky on your site</h4>
          <p>Please choose from the following options:</p>
          <div className='install-options fade-in'>
            <Button className='install-option' onClick={() => setSelectedOption(InstallOptions.MANUAL)}>
              <Icon name='code-s-slash-line' />
              <span>Manual installation</span>
              <Icon name='arrow-right-s-line' />
            </Button>
            <Button className='install-option' onClick={() => setSelectedOption(InstallOptions.GUIDE)}>
              <Icon name='book-open-line' />
              <span>Use an installation guide</span>
              <Icon name='arrow-right-s-line' />
            </Button>
            <Button className='install-option' onClick={() => setSelectedOption(InstallOptions.DEVELOPER)}>
              <Icon name='mail-line' />
              <span>Send instructions to a developer</span>
              <Icon name='arrow-right-s-line' />
            </Button>
          </div>
          <div className='footer'>
            <Button className='quaternary' type='button' onClick={handleBack}>
              Back
            </Button>
            <Button className='quaternary' type='button' onClick={handleSuccess}>
              I&apos;ll do this later
            </Button>
          </div>
        </>
      )}

      {selectedOption === InstallOptions.MANUAL && (
        <>
          <h4>Manual Installation</h4>
          <p>Paste the code below into the <code className='code'>&lt;head&gt;</code> section of the HTML on every page you&apos;d like to track on your website.</p>
          <p>This is the code that enables Squeaky to capture usage data on your site.</p>
          <div className='footer'>
            <Button className='quaternary' type='button' onClick={handleReturnToSelection}>
              Back
            </Button>
            <Button className='primary' type='button'>
              Verify Installation
            </Button>
          </div>
        </>
      )}

      {selectedOption === InstallOptions.GUIDE && (
        <>
          <h4>Use an installation guide</h4>
          <p>Please choose from the following options:</p>
          <div className='footer'>
            <Button className='quaternary' type='button' onClick={handleReturnToSelection}>
              Back
            </Button>
            <Button className='primary' type='button'>
              Verify Installation
            </Button>
          </div>
        </>
      )}
      {selectedOption === InstallOptions.DEVELOPER && (
        <>
          <h4>Send instructions to a developer</h4>
          <p>If you&apos;d like to have someone else install Squeaky on your site, use the form below.</p>
          <div className='footer'>
            <Button className='quaternary' type='button' onClick={handleReturnToSelection}>
              Back
            </Button>
            <Button className='primary' type='button'>
              Send Instructions
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
