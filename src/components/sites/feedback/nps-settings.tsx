import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Toggle } from 'components/toggle';
import { Spinner } from 'components/spinner';
import { Error } from 'components/error';
import { useFeedback } from 'hooks/use-feedback';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import { HEX_REGEX } from 'data/common/constants';
import { useToasts } from 'hooks/use-toasts';
import type { FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
}

const DEFAULT_COLORS = ['#0074E0', '#F96155', '#8249FB', '#001A39'];

const NpsSchema = Yup.object().shape({
  npsAccentColor: Yup.string().matches(HEX_REGEX, 'Accent color is requied'),
  npsSchedule: Yup.string().oneOf(['once', 'monthly'], 'Please select frequency'),
  npsPhrase: Yup.string().required('Accent color is requied'),
  npsFollowUpEnabled: Yup.boolean(),
  npsContactConsentEnabled: Yup.boolean(),
  npsLayout: Yup.string().oneOf(['full_width', 'boxed'], 'Please select a layout type'),
});

export const NpsSettings: FC<Props> = ({ site }) => {
  const toasts = useToasts();
  const { loading, error, feedback } = useFeedback();

  const onUpdate = async (input: Partial<FeedbackUpdateInput>): Promise<void> => {
    await feedbackUpdate({
      siteId: site.id,
      ...input,
    });
  };

  const onToggleEnableNps = async () => {
    await onUpdate({ npsEnabled: !feedback.npsEnabled });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='nps-settings'>
      <Toggle checked={feedback.npsEnabled} onChange={onToggleEnableNps}>
        Use NPS® Survey
      </Toggle>

      {feedback.npsEnabled && (
        <Container className='md'>
          <Formik
            initialValues={{ 
              npsAccentColor: feedback.npsAccentColor || '#0074E0', 
              npsSchedule: feedback.npsSchedule || 'once',
              npsPhrase: feedback.npsPhrase || site.name,
              npsFollowUpEnabled: feedback.npsFollowUpEnabled ?? true,
              npsContactConsentEnabled: feedback.npsContactConsentEnabled ?? false,
              npsLayout: feedback.npsLayout || 'full_width',
            }}
            validationSchema={NpsSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                const params: Pick<
                  FeedbackUpdateInput, 
                  'npsAccentColor' | 
                  'npsSchedule' | 
                  'npsPhrase' | 
                  'npsContactConsentEnabled' | 
                  'npsFollowUpEnabled' | 
                  'npsLayout'
                > = {
                  npsAccentColor: values.npsAccentColor,
                  npsPhrase: values.npsPhrase,
                  npsContactConsentEnabled: values.npsContactConsentEnabled,
                  npsFollowUpEnabled: values.npsFollowUpEnabled,
                  npsLayout: values.npsLayout,
                  npsSchedule: values.npsSchedule,
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
              isSubmitting,
              touched,
              values,
              errors,
              isValid,
            }) => (
              <form onSubmit={handleSubmit}>
                <h4>Accent Colour</h4>

                <p>Set an accent colour for the survey by using the preset colours below, or defining your own custom colour by checking the box and enter a hex code.</p>

                <div className='colors'>
                  <Radio 
                    name='npsAccentColor'
                    className='color-radio' 
                    value='#0074E0' 
                    checked={values.npsAccentColor === '#0074E0'}
                    onChange={handleChange}
                  >
                    <div className='color blue'>
                      <i className='ri-check-line' />
                    </div>
                  </Radio>
                  <Radio 
                    name='npsAccentColor'
                    className='color-radio' 
                    value='#F96155' 
                    checked={values.npsAccentColor === '#F96155'}
                    onChange={handleChange}
                  >
                    <div className='color magenta'>
                      <i className='ri-check-line' />
                    </div>
                  </Radio>
                  <Radio
                    name='npsAccentColor'
                    className='color-radio' 
                    value='#8249FB' 
                    checked={values.npsAccentColor === '#8249FB'}
                    onChange={handleChange}
                  >
                    <div className='color purple'>
                      <i className='ri-check-line' />
                    </div>
                  </Radio>
                  <Radio
                    name='npsAccentColor'
                    className='color-radio' 
                    value='#001A39' 
                    checked={values.npsAccentColor === '#001A39'}
                    onChange={handleChange}
                  >
                    <div className='color gray'>
                      <i className='ri-check-line' />
                    </div>
                  </Radio>

                  <p>- or - </p>

                  <Radio 
                    readOnly
                    checked={!DEFAULT_COLORS.includes(values.npsAccentColor)}
                  />
                  <Input 
                    name='npsAccentColor'
                    className='hex'
                    placeholder='e.g. #32D05F' 
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={DEFAULT_COLORS.includes(values.npsAccentColor) ? '' : values.npsAccentColor}
                    invalid={touched.npsAccentColor && !!errors.npsAccentColor}
                  />
                </div>

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

                <h4>Form options</h4>

                <p><b>Question phrasing</b></p>

                <p>We use the standard NPS question phrasing, but you can partially edit the question below.</p>

                <div className='phrasing'>
                  How likely is it that you would recommend
                  <Input 
                    name='npsPhrase'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.npsPhrase}
                    invalid={touched.npsPhrase && !!errors.npsPhrase}
                  />
                  to a friend or colleague?
                </div>

                <p><b>Follow-up questions</b></p>

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

                <h4>Layout</h4>

                <p>Choose whether you want your NPS® survey to appear as a full width banner or in a narrower boxed layout.</p>
                
                <div className='radio-group'>
                  <Radio
                    name='npsLayout'
                    value='full_width'
                    onChange={handleChange}
                    checked={values.npsLayout === 'full_width'}
                  >
                    Full width
                  </Radio>
                  <Radio
                    name='npsLayout'
                    value='boxed'
                    onChange={handleChange}
                    checked={values.npsLayout === 'boxed'}
                  >
                    Boxed
                  </Radio>
                </div>

                <div className='actions'>
                  <Button disabled={isSubmitting || !isValid} type='submit' className='primary'>
                    Save Changes
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </Container>
      )}
    </div>
  );
};
