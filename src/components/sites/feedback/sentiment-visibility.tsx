import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { feedbackUpdate } from 'lib/api/graphql';
import { Label } from 'components/label';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import { Container } from 'components/container';
import { SentimentPages } from 'components/sites/feedback/sentiment-pages';
import { SentimentPreview } from 'components/sites/feedback/sentiment-preview';
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

const SentimentSchema = Yup.object().shape({
  sentimentExcludedPages: Yup.array(),
  sentimentDevices: Yup.array(),
});

export const SentimentVisibility: FC<Props> = ({ site, locale, feedback, setLocale }) => {
  const toasts = useToasts();

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
            sentimentExcludedPages: feedback.sentimentExcludedPages || [],
            sentimentDevices: feedback.sentimentDevices || ['desktop', 'tablet'],
          }}
          validationSchema={SentimentSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              const params: Pick<FeedbackUpdateInput, 'sentimentExcludedPages' |  'sentimentDevices'> = {
                sentimentExcludedPages: values.sentimentExcludedPages,
                sentimentDevices: values.sentimentDevices,
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
            handleChange,
            handleSubmit,
            handleReset,
            isSubmitting,
            values,
            isValid,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <h4>Pages</h4>

              <p>By default <b>your Sentiment feedback widget will display on all pages</b> of your site. If you&apos;d like to hide the widget on any specific pages you can check the boxes for them below.</p>

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
                    feedback={{ ...feedback, ...values }}
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
