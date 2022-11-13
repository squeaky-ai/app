import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Card } from 'components/card';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { consentUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  handleBack: VoidFunction;
  handleForward: VoidFunction;
}

const ConsentSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  privacyPolicyUrl: Yup.string().required('Privacy policy is required'),
  layout: Yup.string().oneOf(['bottom_left', 'bottom_right', 'center']),
  consentMethod: Yup.string().oneOf(['disabled', 'api', 'widget']),
  languages: Yup.array(),
  languagesDefault: Yup.string().required('A default language is required'),
});

export const StepConsent: FC<Props> = ({ site, handleBack, handleForward }) => {
  const toasts = useToasts();

  return (
    <div className='step step-consent'>
      <p className='subheading'>Put privacy first</p>
      <h4>Consent Method</h4>
      <div className='details'>
        <p>If you need to ask for consent prior to capturing data with Squeaky you can choose from the following options.</p>
      </div>

      <Formik
        initialValues={{ 
          name: site.consent.name || site.name,
          privacyPolicyUrl: site.consent.privacyPolicyUrl || `${site.url}/privacy`,
          layout: 'bottom_left',
          languages: ['en'],
          languagesDefault: 'en',
          consentMethod: site.consent.consentMethod || 'widget',
        }}
        validationSchema={ConsentSchema}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              await consentUpdate({
                siteId: site.id,
                name: values.name,
                layout: values.layout,
                languages: values.languages,
                languagesDefault: values.languagesDefault,
                consentMethod: values.consentMethod,
                privacyPolicyUrl: values.privacyPolicyUrl,
              });
              handleForward();
            } catch {
              toasts.add({ type: 'error', body: 'There was an issue updating the settings' });
            } finally {
              setSubmitting(false);
            }
          })();
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          errors,
          isValid,
        }) => (
          <div className='site-anonymisation fade-in'>
            <Card>
              <form onSubmit={handleSubmit}>
                <div className='radio-group'>
                  <Radio
                    name='consentMethod'
                    value='widget'
                    onChange={handleChange}
                    checkIcon='check-line'
                    className='check-radio'
                    checked={values.consentMethod === 'widget'}
                  >
                    Use the Squeaky consent widget
                  </Radio>
                  {values.consentMethod === 'widget' && (
                    <div className='consent-details'>
                      <Label htmlFor='name'>Company name</Label>
                      <Input 
                        type='text'
                        placeholder='e.g. ACME Inc'
                        name='name'
                        autoComplete='off'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        invalid={touched.name && !!errors.name}
                      />
                      <span className='validation'>{errors.name}</span>

                      <Label htmlFor='privacyPolicyUrl'>Privacy policy</Label>
                      <Input 
                        type='text'
                        placeholder='e.g. https://acme.com/privacy'
                        name='privacyPolicyUrl'
                        autoComplete='off'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.privacyPolicyUrl}
                        invalid={touched.privacyPolicyUrl && !!errors.privacyPolicyUrl}
                      />
                      <span className='validation'>{errors.privacyPolicyUrl}</span>
                    </div>
                  )}
                  <Radio
                    name='consentMethod'
                    value='api'
                    onChange={handleChange}
                    checkIcon='check-line'
                    className='check-radio'
                    checked={values.consentMethod === 'api'}
                  >
                    Manage consent via API
                  </Radio>
                  <a target='_blank' href='/developers'>Developer docs</a>
                  <Radio
                    name='consentMethod'
                    value='disabled'
                    onChange={handleChange}
                    checkIcon='check-line'
                    className='check-radio'
                    checked={values.consentMethod === 'disabled'}
                  >
                    Consent not required, or using a third-party consent management tool
                  </Radio>
                </div>
                <div className='footer'>
                  <Button className='quaternary' type='button' onClick={handleBack}>
                    Back
                  </Button>
                  <Button className='primary' type='submit' disabled={isSubmitting || !isValid}>
                    Next
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </Formik>
    </div>
  );
};
