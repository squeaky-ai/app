import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import classnames from 'classnames';
import { Formik } from 'formik';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { Card } from 'components/card';
import { NpsPages } from 'components/sites/feedback/nps-pages';
import { useToasts } from 'hooks/use-toasts';
import { NpsPreview } from 'components/sites/feedback/nps-preview';
import type { Feedback, FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  feedback: Feedback;
}

const NpsSchema = Yup.object().shape({
  npsSchedule: Yup.string().oneOf(['once', 'monthly', 'custom'], 'Please select frequency'),
  npsExcludedPages: Yup.array(),
});

export const NpsScheduling: FC<Props> = ({ site, feedback }) => {
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
            npsSchedule: feedback.npsSchedule || 'once',
            npsExcludedPages: feedback.npsExcludedPages || [],
          }}
          validationSchema={NpsSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              const params: Pick<FeedbackUpdateInput, 'npsSchedule' | 'npsExcludedPages'> = {
                npsSchedule: values.npsSchedule,
                npsExcludedPages: values.npsExcludedPages,
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
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
            values,
            isValid,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <h4>Scheduling</h4>

              <p>Use the options below to set the frequency with which your visitors are asked to complete the NPS survey.</p>

              <div className='radio-group schedule'>
                <Radio
                  name='npsSchedule'
                  value='once'
                  onChange={handleChange}
                  checked={values.npsSchedule === 'once'}
                >
                  One-time
                </Radio>
                <Radio
                  name='npsSchedule'
                  value='monthly'
                  onChange={handleChange}
                  checked={values.npsSchedule === 'monthly'}
                >
                  Once a month
                </Radio>
                <Radio
                  name='npsSchedule'
                  value='custom'
                  onChange={handleChange}
                  checked={values.npsSchedule === 'custom'}
                >
                  Custom trigger <i>(technical expertise required)</i>
                </Radio>
              </div>

              <Card className={classnames('custom-hint', { disabled: values.npsSchedule !== 'custom' })}>
                <p>If you require the NPS survey to trigger only at very specific moments you can define custom triggers. This is achieved by using the <code className='code'>squeaky.showNpsSurvey()</code> method in your code that will be detected by our tracking script. For more information and examples, please visit the <a target='_blank' href='/developers'>Squeaky Developer Documentation</a>.</p>
              </Card>

              <div className={classnames('pages', { disabled: values.npsSchedule === 'custom' })}>
                <h4>Pages</h4>

                <p>If you are using the &quot;One-time&quot; or &quot;Once per month&quot; schedules then <b>your NPS survey banner could be displayed on any page</b> of your site, if you&apos;d like to prevent the survey from appearing on specific pages then you can check the boxes.</p>

                <p><b>Hide feedback widget on:</b></p>

                <NpsPages 
                  value={values.npsExcludedPages}
                  onChange={handleChange}
                  setSelected={(pages: string[]) => {
                    setFieldValue('npsExcludedPages', pages);
                  }}
                />
              </div>

              <div className='actions'>
                <div className='left'>
                  <Button disabled={isSubmitting || !isValid} type='submit' className='primary'>
                    Save Changes
                  </Button>

                  <Button className='quaternary' type='button' onClick={handleReset}>
                    Discard Changes
                  </Button>
                </div>
                <div className='right'>
                  <NpsPreview 
                    site={site}
                    feedback={{ ...feedback, ...values }}
                  />
                </div>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};
