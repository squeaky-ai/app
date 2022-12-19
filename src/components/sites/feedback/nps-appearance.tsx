import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import Link from 'next/link';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Radio } from 'components/radio';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Checkbox } from 'components/checkbox';
import { NpsPreview } from 'components/sites/feedback/nps-preview';
import { HEX_REGEX } from 'data/common/constants';
import { useToasts } from 'hooks/use-toasts';
import type { Feedback, FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';
import type { SupportedLanguages } from 'types/translations';

interface Props {
  site: Site;
  locale: SupportedLanguages;
  feedback: Feedback;
  setLocale: (locale: SupportedLanguages) => void;
}

const DEFAULT_COLORS = ['#0768C1', '#F96155', '#8249FB', '#001A39'];

const NpsSchema = Yup.object().shape({
  npsAccentColor: Yup.string().matches(HEX_REGEX, 'Accent color is required'),
  npsLayout: Yup.string().oneOf(['full_width', 'boxed'], 'Please select a layout type'),
  npsHideLogo: Yup.boolean(),
});

export const NpsAppearance: FC<Props> = ({ site, locale, feedback, setLocale }) => {
  const toasts = useToasts();

  const isPaying = (site.plan?.tier || 0) > 0;

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
            npsAccentColor: feedback.npsAccentColor || '#0768C1', 
            npsLayout: feedback.npsLayout || 'full_width',
            npsHideLogo: feedback.npsHideLogo || false,
          }}
          validationSchema={NpsSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              const params: Pick<FeedbackUpdateInput, 'npsAccentColor' | 'npsLayout' | 'npsHideLogo'> = {
                npsAccentColor: values.npsAccentColor,
                npsLayout: values.npsLayout,
                npsHideLogo: values.npsHideLogo,
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
            handleReset,
          }) => (
            <form onSubmit={handleSubmit}>
              <h4>Accent Colour</h4>

              <p>Set an accent colour for the survey by using the preset colours below, or defining your own custom colour by checking the box and enter a hex code.</p>

              <div className='colors'>
                <Radio 
                  name='npsAccentColor'
                  className='color-radio' 
                  value='#0768C1' 
                  checked={values.npsAccentColor === '#0768C1'}
                  onChange={handleChange}
                >
                  <div className='color blue'>
                    <Icon name='check-line' />
                  </div>
                </Radio>
                <Radio 
                  name='npsAccentColor'
                  className='color-radio' 
                  value='#F96155' 
                  checked={values.npsAccentColor === '#F96155'}
                  onChange={handleChange}
                >
                  <div className='color rose'>
                    <Icon name='check-line' />
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
                    <Icon name='check-line' />
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
                    <Icon name='check-line' />
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
                  autoComplete='off'
                  value={DEFAULT_COLORS.includes(values.npsAccentColor) ? '' : values.npsAccentColor}
                  invalid={touched.npsAccentColor && !!errors.npsAccentColor}
                />
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

              <div className='hide-logo'>
                {isPaying
                  ? <p>In the bottom-left corner of your feedback widget there is the text &apos;Powered by Squeaky&apos; (or similar, depending on your language settings). You can remove this badge using the option below.</p>
                  : <p>In the bottom-left corner of your feedback widget there is the text &apos;Powered by Squeaky&apos; (or similar, depending on your language settings). Paying subscribers can remove this use the option below.</p>
                }

                <div className='hide-logo-check'>
                  <Checkbox
                    name='npsHideLogo'
                    onChange={handleChange}
                    checked={values.npsHideLogo}
                    disabled={!isPaying}
                  >
                    Hide &apos;Powered by Squeaky&apos; badge
                  </Checkbox>
                  {!isPaying && (<Link href={`/sites/${site.id}/settings/subscription`}>Upgrade to enable</Link>)}
                </div>
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
                    feedback={{ ...feedback, ...values }}
                    storedFeedback={feedback}
                    locale={locale}
                    setLocale={setLocale}
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
