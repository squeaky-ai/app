import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { uniq } from 'lodash';
import { Formik } from 'formik';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Input } from 'components/input';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import { useToasts } from 'hooks/use-toasts';
import { countryNames } from 'types/translations';
import type { Feedback, FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  feedback: Feedback;
}

const NpsSchema = Yup.object().shape({
  npsPhrase: Yup.string().required('Accent color is required'),
  npsFollowUpEnabled: Yup.boolean(),
  npsContactConsentEnabled: Yup.boolean(),
  npsLanguages: Yup.array(),
  npsLanguagesDefault: Yup.string().required('A default language is required'),
});

export const NpsForm: FC<Props> = ({ site, feedback }) => {
  const toasts = useToasts();

  const onUpdate = async (input: Partial<FeedbackUpdateInput>): Promise<void> => {
    await feedbackUpdate({
      siteId: site.id,
      ...input,
    });
  };

  return (
    <div className='nps-settings'>
      <Container className='md'>
        <Formik
          initialValues={{ 
            npsPhrase: feedback.npsPhrase || site.name,
            npsFollowUpEnabled: feedback.npsFollowUpEnabled ?? true,
            npsContactConsentEnabled: feedback.npsContactConsentEnabled ?? false,
            npsLanguages: feedback.npsLanguages || ['en'],
            npsLanguagesDefault: feedback.npsLanguagesDefault || 'en',
          }}
          validationSchema={NpsSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              const params: Pick<
                FeedbackUpdateInput, 
                'npsPhrase' | 
                'npsContactConsentEnabled' | 
                'npsFollowUpEnabled' |
                'npsLanguages' |
                'npsLanguagesDefault'
              > = {
                npsPhrase: values.npsPhrase,
                npsContactConsentEnabled: values.npsContactConsentEnabled,
                npsFollowUpEnabled: values.npsFollowUpEnabled,
                npsLanguages: values.npsLanguages,
                npsLanguagesDefault: values.npsLanguagesDefault,
              };
              
              try {
                await onUpdate(params);
                toasts.add({ type: 'success', body: 'NPS settings updated successfully' });
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
            handleReset,
            setFieldValue,
            isSubmitting,
            touched,
            values,
            errors,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <h4>Question phrasing</h4>

              <p>We use the standard NPS question phrasing, but you can partially edit the question below.</p>

              <div className='phrasing'>
                How likely is it that you would recommend
                <Input 
                  name='npsPhrase'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.npsPhrase}
                  invalid={touched.npsPhrase && !!errors.npsPhrase}
                  autoComplete='off'
                />
                to a friend or colleague?
              </div>

              <h4>Follow-up questions</h4>

              <p>Whilst NPS® is only a simple 1-10 rating, there is typically a follow-up question included, and sometimes the ability to opt-in the receiving a response to submitted feedback. You can choose whether or not to display these properties using the checkboxes below.</p>

              <div className='checkbox-group'>
                <Checkbox
                  name='npsFollowUpEnabled'
                  onChange={handleChange}
                  checked={values.npsFollowUpEnabled}
                >
                  Include follow up question &quot;What&apos;s the main reason for your score?&quot;
                </Checkbox>
                <Checkbox
                  name='npsContactConsentEnabled'
                  onChange={handleChange}
                  checked={values.npsContactConsentEnabled}
                >
                  Allow visitors to consent to being contact by email
                </Checkbox>
              </div>

              <h4>Languages</h4>

              <p>If you have visitors that are using a different primary language then you may wish to adjust the NPS banner accordingly. Please check the boxes before for any languages you&apos;d like to include and we will show the NPS® questions and follow-up questions in these languages if they match the visitors browser or device settings.</p>

              <div className='languages'>
                {Object.entries(countryNames).map(([locale, name]) => (
                  <div className='row' key={locale}>
                    <span className='name'>
                      <Checkbox
                        name='npsLanguages'
                        onChange={(event) => {
                          if (!event.target.checked && locale === values.npsLanguagesDefault) {
                            setFieldValue('npsLanguagesDefault', 'en');
                          }

                          handleChange(event);
                        }}
                        disabled={locale === 'en'}
                        value={locale}
                        checked={values.npsLanguages.includes(locale)}
                      >
                        {name}
                      </Checkbox>
                    </span>
                    <span>
                      {values.npsLanguagesDefault === locale
                        ? <i>Default</i>
                        : (
                            <Button 
                              className='link' 
                              onClick={() => {
                                setFieldValue('npsLanguages', uniq([...values.npsLanguages, locale]));
                                setFieldValue('npsLanguagesDefault', locale);
                              }}
                            >
                              Make default
                            </Button>
                          )
                      }
                    </span>
                  </div>
                ))}
              </div>

              <p>If you&apos;d like to request an additional langauge be added to our NPS® surveys then please contact us via email using <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>

              <div className='actions'>
                <Button disabled={isSubmitting || !isValid} type='submit' className='primary'>
                  Save Changes
                </Button>

                <Button className='quaternary' type='button' onClick={handleReset}>
                  Discard Changes
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};
