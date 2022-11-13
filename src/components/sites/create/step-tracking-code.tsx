import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Label } from 'components/label';
import { Platform } from 'components/platform';
import { Input } from 'components/input';
import { TrackingCode } from 'components/sites/settings/tracking-code';
import { TrackingCodeFailure } from 'components/sites/create/tracking-code-failure';
import { guideLinks } from 'data/sites/constants';
import { useToasts } from 'hooks/use-toasts';
import { verifySite, sendTrackingCodeInstructions } from 'lib/api/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleBack: VoidFunction;
  handleForward: VoidFunction;
  handleSuccess: VoidFunction;
  setSentInstruction: (sentInstructions: boolean) => void;
}

enum InstallOptions {
  MANUAL = 0,
  GUIDE = 1,
  DEVELOPER = 2, 
}

const SendInstructionsSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  email: Yup.string().email().required('Email address is required'),
});

export const StepTrackingCode: FC<Props> = ({
  site,
  handleForward,
  handleBack,
  handleSuccess,
  setSentInstruction,
}) => {
  const toasts = useToasts();

  const [failed, setFailed] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] = React.useState<InstallOptions>(null);

  const handleReturnToSelection = () => setSelectedOption(null);

  const siteVerify = async () => {
    setLoading(true);

    const { verifiedAt } = await verifySite({ siteId: site.id });
    setLoading(false);

    if (verifiedAt) {
      setFailed(false);
      handleForward();
    } else {
      setFailed(true);
    }
  };

  React.useEffect(() => {
    setFailed(false);
    setLoading(false);
  }, [selectedOption]);

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
          <div className='fade-in'>
            <TrackingCode site={site} />
            {failed && (
              <TrackingCodeFailure site={site} handleClick={siteVerify} loading={loading} />
            )}
            <div className='footer'>
              <Button className='quaternary' type='button' onClick={handleReturnToSelection}>
                Back
              </Button>
              <Button className='primary' type='button' onClick={siteVerify}>
                {loading 
                  ? 'Verifying ...' 
                  : 'Verify Installation'
                }
              </Button>
            </div>
          </div>
        </>
      )}

      {selectedOption === InstallOptions.GUIDE && (
        <>
          <h4>Use an installation guide</h4>
          <p>Please choose from the following options:</p>
          <div className='fade-in'>
            <div className='installation-guides'>
              <div className='guides'>
                <Label>Guides</Label>
                <div className='platforms'>
                  <Link href={guideLinks.manual}>
                    <a target='_blank' rel='noreferrer'>
                      <Icon name='code-s-slash-line' />
                      <span className='name'>Manual installation</span>
                    </a>
                  </Link>
                  <Link href={guideLinks.wordpress}>
                    <a target='_blank' rel='noreferrer'>
                      <Platform platform='wordpress' height={24} width={24} alt='Wordpress Logo' />
                      <span className='name'>Wordpress</span>
                    </a>
                  </Link>
                  <Link href={guideLinks.shopify}>
                    <a target='_blank' rel='noreferrer'>
                      <Platform platform='shopify' height={24} width={24} alt='Shopify Logo' />
                      <span className='name'>Shopify</span>
                    </a>
                  </Link>
                  <Link href={guideLinks.wix}>
                    <a target='_blank' rel='noreferrer'>
                      <Platform platform='wix' height={24} width={24} alt='Wix Logo' />
                      <span className='name'>Wix</span>
                    </a>
                  </Link>
                  <Link href={guideLinks.webflow}>
                    <a target='_blank' rel='noreferrer'>
                      <Platform platform='webflow' height={24} width={24} alt='Webflow Logo' />
                      <span className='name'>Webflow</span>
                    </a>
                  </Link>
                  <Link href={guideLinks.magento}>
                    <a target='_blank' rel='noreferrer'>
                      <Platform platform='magento' height={24} width={24} alt='Magento Logo' />
                      <span className='name'>Magento</span>
                    </a>
                  </Link>
                  <Link href={guideLinks.drupal}>
                    <a target='_blank' rel='noreferrer'>
                      <Platform platform='drupal' height={24} width={24} alt='Drupal Logo' />
                      <span className='name'>Drupal</span>
                    </a>
                  </Link>
                </div>
              </div>
              <div>
                <TrackingCode site={site} />
              </div>
            </div>
            {failed && (
              <TrackingCodeFailure site={site} handleClick={siteVerify} loading={loading} />
            )}
            <div className='footer'>
              <Button className='quaternary' type='button' onClick={handleReturnToSelection}>
                Back
              </Button>
              <Button className='primary' type='button' onClick={siteVerify}>
                {loading 
                  ? 'Verifying ...' 
                  : 'Verify Installation'
                }
              </Button>
            </div>
          </div>
        </>
      )}
      {selectedOption === InstallOptions.DEVELOPER && (
        <>
          <h4>Send instructions to a developer</h4>
          <p>If you&apos;d like to have someone else install Squeaky on your site, use the form below.</p>
          <div className='fade-in'>
            <Formik
              initialValues={{ firstName: '', email: '' }}
              validationSchema={SendInstructionsSchema}
              onSubmit={(values, { setSubmitting }) => {
                (async () => {
                  try {
                    await sendTrackingCodeInstructions({
                      siteId: site.id,
                      firstName: values.firstName,
                      email:values.email,
                    });
                    handleForward();
                    setSentInstruction(true);
                  } catch(error: any) {
                    console.error(error);
                    toasts.add({ type: 'error', body: 'There was an error sending the instructions' });
                  } finally {
                    setSubmitting(false);
                  }
                })();
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                isValid,
                dirty,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className='send-instructions'>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input
                      name='firstName' 
                      type='text' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='e.g. Jess'
                      autoComplete='off'
                      value={values.firstName}
                      invalid={touched.firstName && !!errors.firstName}
                    />
                    <span className='validation'>{errors.firstName}</span>
                    <Label htmlFor='email'>Email address</Label>
                    <Input
                      name='email' 
                      type='email' 
                      onBlur={handleBlur}
                      onChange={handleChange}
                      placeholder='e.g. jess.smith@email.com'
                      autoComplete='off'
                      value={values.email}
                      invalid={touched.email && !!errors.email}
                    />
                    <span className='validation'>{errors.email}</span>
                  </div>

                  <div className='footer'>
                    <Button className='quaternary' type='button' onClick={handleReturnToSelection}>
                      Back
                    </Button>
                    <Button className='primary' type='submit' disabled={isSubmitting || !(dirty && isValid)}>
                      Send Instructions
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};
