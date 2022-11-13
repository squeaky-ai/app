import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from 'components/label';
import { Input } from 'components/input';
import { Button } from 'components/button';
import { Option, Select } from 'components/select';
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
  protocol: Yup.string().oneOf(['http://', 'https://'], 'Please select a protocol')
});

const validateUrl = (urlString: string): boolean => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};

const getSiteUrlParts = (site: Site) => {
  if (!site) return ['', ''];

  return [`${site.url.split('://')[0]}://`, site.url.split('://')[1]];
};

export const StepDetails: FC<Props> = ({ site, siteType, loading, handleForward, handleBack }) => {
  const toasts = useToasts();

  return (
    <div className='step step-details'>
      <h4>Add your site details</h4>
      <p>We&apos;ll use these details to generate your tracking code.</p>

      <Formik
        initialValues={{ name: site?.name || '', protocol: getSiteUrlParts(site)[0] || 'https://', hostname: getSiteUrlParts(site)[1] }}
        validationSchema={DetailsSchema}
        onSubmit={(values, { setSubmitting, setErrors, setFieldValue }) => {
          (async () => {
            try {
              const { name, protocol, hostname } = values;

              // Some people paste the whole url in with the protocol
              // so we strip it and update the field
              const host = hostname.replace(/^https?:\/\//, '');
              setFieldValue('hostname', host);

              const url = `${protocol}${host}`;

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
              <div className='select-input-group'>
                <Select name='protocol' onChange={handleChange} value={values.protocol} invalid={touched.protocol && !!errors.protocol}>
                  <Option value='https://'>https://</Option>
                  <Option value='http://'>http://</Option>
                </Select>
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
