import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { HOSTNAME_REGEX } from 'data/sites/constants';
import { createSite, updateSite } from 'lib/api/graphql';
import { Container } from 'components/container';
import { useToasts } from 'hooks/use-toasts';
import { SiteType } from 'types/sites';
import type { Site } from 'types/graphql';

interface Props {
  site?: Site;
  siteType: SiteType;
  loading: boolean;
  handleBack: VoidFunction;
  handleForward: (site: Site) => void;
}

const DetailsSchema = Yup.object().shape({
  name: Yup.string().required('Site name is required'),
  hostname: Yup.string().matches(HOSTNAME_REGEX, 'URL must be a valid hostname').required('Site URL is required'),
});

const validateUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

const getSiteHostname = (site: Site): string => {
  if (!site) return '';

  return site.url.split('://')[1] || '';
};

export const StepDetails: FC<Props> = ({ site, siteType, loading, handleForward, handleBack }) => {
  const toasts = useToasts();

  return (
    <div className='step step-details'>
      <p className='subheading' />
      <h4>Add your site details</h4>
      <div className='details'>
        <p>We&apos;ll use these details to generate your tracking code.</p>
      </div>

      <Formik
        initialValues={{ name: site?.name || '', hostname: getSiteHostname(site) }}
        validationSchema={DetailsSchema}
        onSubmit={(values, { setSubmitting, setErrors }) => {
          (async () => {
            try {
              const { name, hostname } = values;

              // Some people paste the whole url in with the protocol
              // so we strip it and update the field
              const host = hostname.replace(/^https?:\/\//, '');

              const url = `https://${host}`;

              if (url.includes('localhost')) {
                return setErrors({ hostname: 'Localhost domains are not supported' });
              }

              if (!validateUrl(url)) {
                return setErrors({ hostname: 'URL must be a valid hostname' });
              }

              if (site) {
                await updateSite({ siteId: site.id, url, name })
                return handleForward(site);
              }

              const newSite = await createSite({ name, url, siteType });
              handleForward(newSite);
            } catch(error: any) {
              console.error(error);

              if (/already registered/.test(error)) {
                setErrors({ hostname: 'This site is already registered' });
              } else {
                toasts.add({ type: 'error', body: 'There was an error creating your site' });
              }
            } finally {
              setSubmitting(false);
            }
          })();
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} className='fade-in'>
            <Container className='centered'>
              <Label htmlFor='name'>Site Name</Label>
              <Input
                name='name' 
                type='text' 
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='e.g. My Webite'
                autoComplete='off'
                value={values.name}
                invalid={touched.name && !!errors.name}
              />
              <span className='validation'>{errors.name}</span>

              <Label htmlFor='hostname'>Site URL</Label>
              <div className='thirds-input-group'>
                <Input
                  readOnly
                  disabled
                  value='https://'
                />
                <Input
                  name='hostname' 
                  type='text' 
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder='e.g. www.mywebsite.com'
                  autoComplete='off'
                  value={values.hostname}
                  invalid={touched.hostname && !!errors.hostname}
                />
                <span className='validation'>{errors.hostname}</span>
              </div>
            </Container>

            <div className='footer'>
              <Button className='quaternary' type='button' onClick={handleBack} disabled={isSubmitting || loading}>
                Back
              </Button>
              <Button className='primary' type='submit' disabled={isSubmitting || !isValid || loading}>
                Next
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
