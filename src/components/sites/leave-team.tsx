import React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Modal, ModalBody, ModalHeader, ModalContents, ModalFooter } from 'components/modal';
import { teamLeave } from 'lib/api/graphql';
import { useToasts } from 'hooks/toasts';
import type { Site } from 'types/site';

interface Props {
  site: Site;
}

export const LeaveTeam: FC<Props> = ({ site }) => {
  const toast = useToasts();
  const ref = React.useRef<Modal>();
  const router = useRouter();

  const openModal = () => {
    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  const leaveTeam = async () => {
    const { error } = await teamLeave({ siteId: site.id });

    if (error) {
      toast.add({ type: 'error', body: 'There was an unexpected error when leaving the team. Please try again.' });
    } else {
      toast.add({ type: 'success', body: `You have successfully left the ${site.name} team` });
      await router.push('/sites');
    }
  };

  return (
    <>
      <Button className='negative' onClick={openModal}>Leave site</Button>

      <Modal ref={ref}>
        <ModalBody aria-labelledby='leave-team-title' aria-describedby='leave-team-description'>
          <ModalHeader>
            <p id='leave-team-title'><b>Leave site</b></p>
            <Button type='button' onClick={openModal}>
              <i className='ri-close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <p id='leave-team-description'>Are you sure you wish to leave the site/team?</p>
          </ModalContents>
          <ModalFooter>
            <Button type='button' className='tertiary' onClick={leaveTeam}>
              Yes, I’m leaving
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
