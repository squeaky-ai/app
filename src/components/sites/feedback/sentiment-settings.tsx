import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Toggle } from 'components/toggle';
import { Error } from 'components/error';
import { useFeedback } from 'hooks/use-feedback';
import { feedbackUpdate } from 'lib/api/graphql';
import { Radio } from 'components/radio';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { HEX_REGEX } from 'data/common/constants';
import { SentimentPreview } from 'components/sites/feedback/sentiment-preview';
import { SentimentPages } from 'components/sites/feedback/sentiment-pages';
import { useToasts } from 'hooks/use-toasts';
import type { FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';
import { Checkbox } from 'components/checkbox';

interface Props {
  site: Site;
}

const DEFAULT_COLORS = ['#0768C1', '#F96155', '#8249FB', '#001A39'];

const SentimentSchema = Yup.object().shape({
  sentimentAccentColor: Yup.string().matches(HEX_REGEX, 'Accent color is required'),
  sentimentExcludedPages: Yup.array(),
  sentimentLayout: Yup.string().oneOf(['right_middle', 'right_bottom', 'left_middle', 'left_bottom'], 'Please select a layout type'),
  sentimentDevices: Yup.array(),
  sentimentHideLogo: Yup.boolean(),
});

export const SentimentSettings: FC<Props> = ({ site }) => {
  const toasts = useToasts();
  const { loading, error, feedback } = useFeedback();

  const isPaying = (site.plan?.tier || 0) > 0;

  const onUpdate = async (input: Partial<FeedbackUpdateInput>): Promise<void> => {
    await feedbackUpdate({
      siteId: site.id,
      ...input,
    });
  };

  const onToggleEnableSentiment = async () => {
    await onUpdate({ sentimentEnabled: !feedback.sentimentEnabled });
  };

  if (error) {
    return <Error />;
  }

  return (
    <div className='sentiment-settings'>
      <Toggle checked={feedback.sentimentEnabled} onChange={onToggleEnableSentiment}>
        Use Sentiment Survey
      </Toggle>

      {!loading && feedback.sentimentEnabled && (
        <Container className='md'>
          <Formik
            initialValues={{ 
              sentimentAccentColor: feedback.sentimentAccentColor || '#0768C1', 
              sentimentExcludedPages: feedback.sentimentExcludedPages || [],
              sentimentLayout: feedback.sentimentLayout || 'right_middle',
              sentimentDevices: feedback.sentimentDevices || ['desktop', 'tablet'],
              sentimentHideLogo: feedback.sentimentHideLogo || false,
            }}
            validationSchema={SentimentSchema}
            onSubmit={(values, { setSubmitting }) => {
              (async () => {
                const params: Pick<
                  FeedbackUpdateInput, 
                  'sentimentAccentColor' | 
                  'sentimentExcludedPages' | 
                  'sentimentLayout' |
                  'sentimentDevices' |
                  'sentimentHideLogo'
                > = {
                  sentimentAccentColor: values.sentimentAccentColor,
                  sentimentExcludedPages: values.sentimentExcludedPages,
                  sentimentLayout: values.sentimentLayout,
                  sentimentDevices: values.sentimentDevices,
                  sentimentHideLogo: values.sentimentHideLogo,
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
              isSubmitting,
              touched,
              values,
              errors,
              isValid,
              setFieldValue,
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

                <h4>Position</h4>

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

                <h4>Pages</h4>

                <p>By default <b>your feedback widget will display on all pages</b> of your site, if you&apos;d like to hide the widget on any specific pages you can check the boxes for them below.</p>

                <p><b>Hide feedback widget on:</b></p>

                <SentimentPages 
                  value={values.sentimentExcludedPages}
                  onChange={handleChange}
                  setSelected={(pages: string[]) => {
                    setFieldValue('sentimentExcludedPages', pages);
                  }}
                />

                <h4>Devices</h4>

                <p>Use the options below to determine if your feedback widget will appear on all devices.</p>

                <Label>Show feedback widget on:</Label>

                <div className='checkbox-group'>
                  <Checkbox
                    name='sentimentDevices'
                    value='desktop'
                    onChange={handleChange}
                    checked={values.sentimentDevices.includes('desktop')}
                  >
                    Desktop
                  </Checkbox>
                  <Checkbox
                    name='sentimentDevices'
                    value='tablet'
                    onChange={handleChange}
                    checked={values.sentimentDevices.includes('tablet')}
                  >
                    Tablet
                  </Checkbox>
                  <Checkbox
                    name='sentimentDevices'
                    value='mobile'
                    onChange={handleChange}
                    checked={values.sentimentDevices.includes('mobile')}
                  >
                    Mobile
                  </Checkbox>
                </div>

                <p><b>Please note</b>: If you&apos;re using the left or right positions then your feedback widget may overlap content on your website when used by customers with smaller mobile devices.</p>

                <div className='hide-logo'>
                  {!isPaying && (
                    <p>In the bottom-left corner of your feedback widget there is the text &apos;Powered by Squeaky&apos; (or similar, depending on your language settings). Paying subscribers can remove this use the option below.</p>
                  )}

                  <div className='hide-logo-check'>
                    <Checkbox
                      name='sentimentHideLogo'
                      onChange={handleChange}
                      checked={values.sentimentHideLogo}
                      disabled={!isPaying}
                    >
                      Hide &apos;Powered by Squeaky&apos; badge
                    </Checkbox>
                    {!isPaying && (<Link href={`/sites/${site.id}/settings/subscription`}><a>Upgrade to enable</a></Link>)}
                  </div>
                </div>

                <div className='actions'>
                  <Button disabled={isSubmitting || !isValid} type='submit' className='primary'>
                    Save Changes
                  </Button>

                  <SentimentPreview feedback={values} />
                </div>
              </form>
            )}
          </Formik>
        </Container>
      )}
    </div>
  );
};
