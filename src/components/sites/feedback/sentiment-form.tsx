import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { uniq } from 'lodash';
import { Formik } from 'formik';
import { feedbackUpdate } from 'lib/api/graphql';
import { Container } from 'components/container';
import { Checkbox } from 'components/checkbox';
import { Button } from 'components/button';
import { useToasts } from 'hooks/use-toasts';
import { SentimentPreview } from 'components/sites/feedback/sentiment-preview';
import { countryNames } from 'types/translations';
import type { Feedback, FeedbackUpdateInput } from 'types/graphql';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  feedback: Feedback;
}

const SentimentSchema = Yup.object().shape({
  sentimentLanguages: Yup.array(),
  sentimentLanguagesDefault: Yup.string().required('A default language is required'),
});

export const SentimentForm: FC<Props> = ({ site, feedback }) => {
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
            sentimentLanguages: feedback.sentimentLanguages || ['en'],
            sentimentLanguagesDefault: feedback.sentimentLanguagesDefault || 'en',
          }}
          validationSchema={SentimentSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              const params: Pick<
                FeedbackUpdateInput, 
                'sentimentLanguages' |
                'sentimentLanguagesDefault'
              > = {
                sentimentLanguages: values.sentimentLanguages,
                sentimentLanguagesDefault: values.sentimentLanguagesDefault,
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
            setFieldValue,
            isSubmitting,
            values,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <h4>Languages</h4>

              <p>If you have visitors that are using a different primary language then you may wish to adjust the Sentiment feedback widget accordingly. Please check the boxes below for any language you&apos;d like to include, we&apos;ll show the form in one of these languages if they match the visitors browser or device. settings.</p>

              <div className='languages'>
                {Object.entries(countryNames).map(([locale, name]) => (
                  <div className='row' key={locale}>
                    <span className='name'>
                      <Checkbox
                        name='sentimentLanguages'
                        onChange={(event) => {
                          if (!event.target.checked && locale === values.sentimentLanguagesDefault) {
                            setFieldValue('sentimentLanguagesDefault', 'en');
                          }

                          handleChange(event);
                        }}
                        disabled={locale === 'en'}
                        value={locale}
                        checked={values.sentimentLanguages.includes(locale)}
                      >
                        {name}
                      </Checkbox>
                    </span>
                    <span>
                      {values.sentimentLanguagesDefault === locale
                        ? <i>Default</i>
                        : (
                            <Button 
                              className='link' 
                              onClick={() => {
                                setFieldValue('sentimentLanguages', uniq([...values.sentimentLanguages, locale]));
                                setFieldValue('sentimentLanguagesDefault', locale);
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

              <p>If you&apos;d like to request an additional language be added to our sentiment surveys then please email us via <a href='mailto:hello@squeaky.ai'>hello@squeaky.ai</a>.</p>

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
