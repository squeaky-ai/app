import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { Container } from 'components/container';
import { SentimentPreview } from 'components/sites/feedback/sentiment-preview';
import { HEX_REGEX } from 'data/common/constants';
import { useToasts } from 'hooks/use-toasts';
import { feedbackUpdate } from 'lib/api/graphql';
import type { Feedback, FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  feedback: Feedback;
}

const DEFAULT_COLORS = ['#0768C1', '#F96155', '#8249FB', '#001A39'];

const SentimentSchema = Yup.object().shape({
  sentimentAccentColor: Yup.string().matches(HEX_REGEX, 'Accent color is required'),
  sentimentLayout: Yup.string().oneOf(['right_middle', 'right_bottom', 'left_middle', 'left_bottom'], 'Please select a layout type'),
  sentimentHideLogo: Yup.boolean(),
  sentimentSchedule: Yup.string().oneOf(['always', 'custom'], 'Please select frequency'),
});

export const SentimentAppearance: FC<Props> = ({ site, feedback }) => {
  const toasts = useToasts();

  const isPaying = !site.plan.free || false

  const onUpdate = async (input: Partial<FeedbackUpdateInput>): Promise<void> => {
    await feedbackUpdate({
      siteId: site.id,
      ...input,
    });
  };

  return (
    <div className='sentiment-settings'>
      <Container className='md'>
        <Formik
          initialValues={{ 
            sentimentAccentColor: feedback.sentimentAccentColor || '#0768C1', 
            sentimentLayout: feedback.sentimentLayout || 'right_middle',
            sentimentHideLogo: feedback.sentimentHideLogo || false,
            sentimentSchedule: feedback.sentimentSchedule || 'always',
          }}
          validationSchema={SentimentSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              const params: Pick<
                FeedbackUpdateInput, 
                'sentimentAccentColor' | 
                'sentimentLayout' |
                'sentimentHideLogo' |
                'sentimentSchedule'
              > = {
                sentimentAccentColor: values.sentimentAccentColor,
                sentimentLayout: values.sentimentLayout,
                sentimentHideLogo: values.sentimentHideLogo,
                sentimentSchedule: values.sentimentSchedule,
              };
              
              try {
                await onUpdate(params);
                toasts.add({ type: 'success', body: 'Sentiment settings updated successfully' });
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
              <h4>Accent colour</h4>

              <p>Set an accent colour for the survey by using the preset colours below, or defining your own custom colour by checking the box and enter a hex code.</p>

              <div className='colors'>
                <Radio 
                  name='sentimentAccentColor'
                  className='color-radio' 
                  value='#0768C1' 
                  checked={values.sentimentAccentColor === '#0768C1'}
                  onChange={handleChange}
                >
                  <div className='color blue'>
                    <Icon name='check-line' />
                  </div>
                </Radio>
                <Radio 
                  name='sentimentAccentColor'
                  className='color-radio' 
                  value='#F96155' 
                  checked={values.sentimentAccentColor === '#F96155'}
                  onChange={handleChange}
                >
                  <div className='color rose'>
                    <Icon name='check-line' />
                  </div>
                </Radio>
                <Radio
                  name='sentimentAccentColor'
                  className='color-radio' 
                  value='#8249FB' 
                  checked={values.sentimentAccentColor === '#8249FB'}
                  onChange={handleChange}
                >
                  <div className='color purple'>
                    <Icon name='check-line' />
                  </div>
                </Radio>
                <Radio
                  name='sentimentAccentColor'
                  className='color-radio' 
                  value='#001A39' 
                  checked={values.sentimentAccentColor === '#001A39'}
                  onChange={handleChange}
                >
                  <div className='color gray'>
                    <Icon name='check-line' />
                  </div>
                </Radio>

                <p>- or - </p>

                <Radio 
                  readOnly
                  checked={!DEFAULT_COLORS.includes(values.sentimentAccentColor)}
                />
                <Input 
                  name='sentimentAccentColor'
                  className='hex'
                  placeholder='e.g. #32D05F' 
                  autoComplete='off'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={DEFAULT_COLORS.includes(values.sentimentAccentColor) ? '' : values.sentimentAccentColor}
                  invalid={touched.sentimentAccentColor && !!errors.sentimentAccentColor}
                />
              </div>

              <h4>Layout</h4>

              <p>Use the options below to determine where the feedback widget is positioned on the page.</p>

              <div className='radio-group'>
                <Radio
                  name='sentimentLayout'
                  value='right_middle'
                  onChange={handleChange}
                  checked={values.sentimentLayout === 'right_middle'}
                >
                  Right middle
                </Radio>
                <Radio
                  name='sentimentLayout'
                  value='right_bottom'
                  onChange={handleChange}
                  checked={values.sentimentLayout === 'right_bottom'}
                >
                  Right bottom
                </Radio>
                <Radio
                  name='sentimentLayout'
                  value='left_middle'
                  onChange={handleChange}
                  checked={values.sentimentLayout === 'left_middle'}
                >
                  Left middle
                </Radio>
                <Radio
                  name='sentimentLayout'
                  value='left_bottom'
                  onChange={handleChange}
                  checked={values.sentimentLayout === 'left_bottom'}
                >
                  Left bottom
                </Radio>
              </div>

              <div className='hide-logo'>
                {isPaying
                  ? <p>In the bottom-left corner of your feedback widget there is the text &apos;Powered by Squeaky&apos; (or similar, depending on your language settings). You can remove this badge using the option below.</p>
                  : <p>In the bottom-left corner of your feedback widget there is the text &apos;Powered by Squeaky&apos; (or similar, depending on your language settings). Paying subscribers can remove this use the option below.</p>
                }

                <div className='hide-logo-check'>
                  <Checkbox
                    name='sentimentHideLogo'
                    onChange={handleChange}
                    checked={values.sentimentHideLogo}
                    disabled={!isPaying}
                  >
                    Hide &apos;Powered by Squeaky&apos; badge
                  </Checkbox>
                  {!isPaying && (<Link href={`/sites/${site.id}/settings/subscription`}>Upgrade to enable</Link>)}
                </div>
              </div>

              <h4 className='schedule'>Custom Trigger <i>(technical expertise required)</i></h4>

              <p>By default you site will use the Squeaky &apos;Feedback&apos; tab to signpost your feedback widget to visitors of your site - you can click preview in the bottom right of this page to see what that looks like.</p>
              <p>Some companies wish to hide the tab and only display the feedback pop-up when their own custom button is clicked. If you wish to do this, please check the box below and visit the <a target='_blank' href='/developers'>Developer Documentation</a> to learn how to configure a custom button.</p>

              <Checkbox
                name='sentimentSchedule'
                checked={values.sentimentSchedule === 'custom'}
                onChange={(event) => {
                  setFieldValue('sentimentSchedule', event.target.checked ? 'custom' : 'always');
                }}
              >
                Use custom trigger
              </Checkbox>

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
                  <SentimentPreview
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
