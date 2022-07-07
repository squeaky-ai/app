import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { routesUpdate } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site: Site;
  button?: string;
  buttonClassName?: string;
  routes: string[];
}

const PageRoutesSchema = Yup.object().shape({
  routes: Yup.array(),
});

export const PageRoutes: FC<Props> = ({ site, button, buttonClassName, routes }) => {
  const ref = React.useRef<Modal>();
  const [route, setRoute] = React.useState<string>('');

  const toasts = useToasts();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className={classnames('page-routes', buttonClassName)} onClick={openModal}>
        {button || <><Icon name='guide-line' />URL structure <span>({ routes.length })</span></>}
      </Button>

      <Modal ref={ref} className='md page-routes-modal'>
        <Formik
          initialValues={{ routes }}
          validationSchema={PageRoutesSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                await routesUpdate({ siteId: site.id, routes: values.routes });
                toasts.add({ type: 'success', body: 'URL structure updated' });
                closeModal();
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
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='page-routes-title'>
                <ModalHeader>
                  <p id='page-routes-title'><b>URL structure</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>    
                  <p>If your app generates a URL structure that contains unique parameters e.g. User ID&apos;s, then use the tool below to swap these parameters with a common phrase. This will generate a cleaner and more readable map of your visitor journey.</p>
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
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary'>
                    Save Changes
                  </Button>
                  <Button type='button' className='quaternary' onClick={closeModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalBody>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
