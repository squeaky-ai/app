import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { Spinner } from 'components/spinner';
import { Radio } from 'components/radio';
import { Search } from 'components/search';
import { Label } from 'components/label';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { useAdminSites } from 'hooks/use-admin-sites';
import { adminSiteBundleCreate } from 'lib/api/graphql';
import { AdminSiteSort, SitesBundle } from 'types/graphql';

interface Props {
  bundle: SitesBundle;
  onClose?: VoidFunction;
}

export const SiteBundlesCreate: FC<Props> = ({ bundle, onClose }) => {
  const ref = React.useRef<Modal>();

  const [siteId, setSiteId] = React.useState<string>('');
  const [search, setSearch] = React.useState<string>('');

  const { sites, loading } = useAdminSites({ 
    page: 1,
    size: 10,
    sort: AdminSiteSort.NameAsc,
    search,
  });

  const bundledIds = bundle.sites.map(site => site.id);

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const handleCreate = async () => {
    closeModal();

    await adminSiteBundleCreate({
      siteId,
      bundleId: bundle.id,
    });
  };

  return (
    <>
      <Button type='button' className='add-to-bundle'  onClick={openModal}>
        <Icon name='bubble-chart-line' />
        Add site to bundle
      </Button>

      <Modal ref={ref} className='sm add-site-to-bundle-modal' onClose={onClose}>
        <ModalBody aria-labelledby='add-to-bundle-title'>
          <ModalHeader>
            <p id='add-to-bundle-title'><b>Add to Bundle</b></p>
            <Button type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <Search
              search={search} 
              placeholder='Search names...'
              onSearch={setSearch} 
            />

            {loading && (
              <Spinner />
            )}

            <ul className='site-selector'>
              {sites.items.map(site => (
                <li key={site.id} className={classnames({ bundled: bundledIds.includes(site.id) })}>
                  <Label>
                    <Radio 
                      checked={site.id === siteId}
                      onChange={() => setSiteId(site.id)}
                      disabled={bundledIds.includes(site.id)}
                    />
                    {site.name}
                  </Label>
                </li>
              ))}
            </ul>
          </ModalContents>
          <ModalFooter>
            <Button type='button' onClick={handleCreate} className='primary' disabled={!siteId}>
              Add site
            </Button>
            <Button type='button' className='quaternary' onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </>
  );
};
