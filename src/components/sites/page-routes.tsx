import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useToasts } from 'hooks/use-toasts';

interface Props {
  button?: string;
  buttonClassName?: string;
  routes: string[];
  setRoutes: (routes: string[]) => void;
}

const PageRoutesSchema = Yup.object().shape({
  routes: Yup.array(),
});

export const PageRoutes: FC<Props> = ({ button, buttonClassName, routes, setRoutes }) => {
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
        {button || <><Icon name='guide-line' />Page Routes <span>({ routes.length })</span></>}
      </Button>

      <Modal ref={ref} className='md page-routes-modal'>
        <Formik
          initialValues={{ routes }}
          validationSchema={PageRoutesSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                setRoutes(values.routes);
                toasts.add({ type: 'success', body: 'Page routes updated' });
                closeModal();
              } catch(error) {
                console.error(error);
                toasts.add({ type: 'error', body: 'Failed to update page routes' });
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
                  <p id='page-routes-title'><b>Page Routes</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>    
                  <p>Replace whatever you want to replace with &quot;:parameter&quot;, this text can be anything you want, just make sure it starts with a colon.</p>
                  <div className='add-route'>
                    <Input
                      type='text'
                      placeholder='e.g. /products/:product/features'
                      name='route'
                      autoComplete='off'
                      value={route}
                      onChange={event => setRoute(event.target.value)}
                    />
                    <Button type='button' className='secondary' onClick={() => {
                      setFieldValue('routes', [...values.routes, route]);
                      setRoute('');
                    }}>
                      Add
                    </Button>
                  </div>

                  <div className='routes'>
                    {values.routes.map(route => (
                      <div className='route' key={route}>
                        <span>{route}</span>
                        <Button type='button' className='link' onClick={() => setFieldValue('routes', values.routes.filter(r => r !== route))}>
                          <Icon name='close-line' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary'>
                    Save
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
