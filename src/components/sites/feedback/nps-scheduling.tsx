import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Radio } from 'components/radio';
import { Button } from 'components/button';
import { NpsPages } from 'components/sites/feedback/nps-pages';
import { useToasts } from 'hooks/use-toasts';
import type { Feedback, FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  feedback: Feedback;
}

const NpsSchema = Yup.object().shape({
  npsSchedule: Yup.string().oneOf(['once', 'monthly'], 'Please select frequency'),
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
              </div>

              <h4>Pages</h4>

              <p>By default <b>your NPS survey banner could be displayed on any page</b> of your site, if you&apos;d like to hide the pop-up on any specific pages you can check the boxes for them below.</p>

              <p><b>Hide feedback widget on:</b></p>

              <NpsPages 
                value={values.npsExcludedPages}
                onChange={handleChange}
              />

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
