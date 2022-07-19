import React from 'react';
import type { FC } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { Input } from 'components/input';
import { useToasts } from 'hooks/use-toasts';
import { adminSiteAssociateCustomer } from 'lib/api/graphql';
import type { AdminSite } from 'types/graphql';

interface Props {
  site: AdminSite;
}

const UpgradeSchema = Yup.object().shape({
  customerId: Yup.string().required('Customer ID is required'),
});

export const SiteEnterpriseUpgrade: FC<Props> = ({ site }) => {
  const ref = React.useRef<Modal>();

  const toasts = useToasts();

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='link enterprise-upgrade' onClick={openModal}>
        Enterprise Upgrade
      </Button>

      <Modal ref={ref} className='sm enterprise-upgrade-modal'>
        <Formik
          initialValues={{ customerId: '' }}
          validationSchema={UpgradeSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async () => {
              try {
                await adminSiteAssociateCustomer({ siteId: site.id, customerId: values.customerId });
                toasts.add({ type: 'success', body: 'Enterprise upgrade successful' });
                closeModal();
              } catch(error) {
                console.error(error);
                toasts.add({ type: 'error', body: 'Failed to upgrade enterprise' });
              } finally {
                setSubmitting(false);
              }
            })();
          }}
        >
          {({
            handleBlur,
            handleSubmit,
            handleChange,
            touched,
            values,
            errors,
          }) => (                
            <form onSubmit={handleSubmit}>
              <ModalBody aria-labelledby='enterprise-upgrade-title' aria-describedby='enterprise-upgrade-description'>
                <ModalHeader>
                  <p id='enterprise-upgrade-title'><b>Enterprise Upgrade</b></p>
                  <Button type='button' onClick={closeModal}>
                    <Icon name='close-line' />
                  </Button>
                </ModalHeader>
                <ModalContents>
                  <p id='enterprise-upgrade-description'>To upgrade a site to Enterprise, please complete the following steps:</p>
                  <ol>
                    <li>
                      Create the customer in <a href='https://dashboard.stripe.com/customers' target='_blank' rel='noreferrer'>Stripe</a>
                    </li>
                    <li>
                      Enter the customer_id from Stripe here
                      <Input 
                        type='text'
                        placeholder='e.g. cus_94u549jsf-sdfd'
                        name='customerId'
                        autoComplete='off'
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.customerId}
                        invalid={touched.customerId && !!errors.customerId}
                      />
                    </li>
                    <li>
                      Create an invoice for the customer in Stripe
                    </li>
                    <li>
                      Email the invoice to the customer
                    </li>
                  </ol>
                </ModalContents>
                <ModalFooter>
                  <Button type='submit' className='primary'>
                    Upgrade To Enterprise 
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
