import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useToasts } from 'hooks/use-toasts';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Icon } from 'components/icon';
import { routesUpdate } from 'lib/api/graphql';
import type { Site } from 'types/graphql';
import { Container } from 'components/container';

interface Props {
  routes: string[];
  site: Site;
}

const PageRoutesSchema = Yup.object().shape({
  routes: Yup.array(),
});

export const UrlStructure: FC<Props> = ({ routes, site }) => {
  const [route, setRoute] = React.useState<string>('');

  const toasts = useToasts();

  return (
    <Formik
      initialValues={{ routes }}
      validationSchema={PageRoutesSchema}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            await routesUpdate({ siteId: site.id, routes: values.routes });
            toasts.add({ type: 'success', body: 'URL structure updated' });
          } catch(error) {
            console.error(error);
            toasts.add({ type: 'error', body: 'Failed to update URL structure' });
          } finally {
            setSubmitting(false);
          }
        })();
      }}
    >
      {({
        handleSubmit,
        values,
        setFieldValue,
      }) => (            
        <Container className='sm routes-form'>
          <form onSubmit={handleSubmit}> 
            <p>If your site generates a URL structure that contains unique parameters e.g. User ID&apos;s, then use the tool below to swap these parameters with a common phrase. This will generate a cleaner and more readable map of your visitor journey.</p>
            <p><b>For example:</b></p>
            <ul>
              <li><code className='code'>/products/:product/features</code></li>
              <li><code className='code'>/blog/:category/:post</code></li>
            </ul>
            <div className='add-route'>
              <Input
                type='text'
                placeholder='e.g. /products/:product/features'
                name='route'
                autoComplete='off'
                value={route}
                onChange={event => setRoute(event.target.value)}
              />
              <Button type='button' className='secondary' disabled={!route} onClick={() => {
                setFieldValue('routes', [...values.routes, route]);
                setRoute('');
              }}>
                Add
              </Button>
            </div>

            <div className='routes'>
              {values.routes.map(route => (
                <div className='route' key={route}>
                  <code className='code'>{route}</code>
                  <Button type='button' className='link' onClick={() => setFieldValue('routes', values.routes.filter(r => r !== route))}>
                    <Icon name='close-line' />
                  </Button>
                </div>
              ))}
            </div>
            <div className='actions'>
              <Button type='submit' className='primary'>
                Save Changes
              </Button>
            </div>
          </form>
        </Container>
      )}
    </Formik>
  );
};
