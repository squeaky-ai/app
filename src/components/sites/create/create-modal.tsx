import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { Steps } from 'components/sites/create/steps';
import { StepType } from 'components/sites/create/step-type';
import { StepDetails } from 'components/sites/create/step-details';
import { StepInvite } from 'components/sites/create/step-invite-team';
import { StepTrackingCode } from 'components/sites/create/step-tracking-code';
import { StepConfirmation } from 'components/sites/create/step-confirmation';
import { CloseConfirmModal } from 'components/sites/create/close-confirm-modal';
import { Modal, ModalBody, ModalContents, ModalHeader } from 'components/modal';
import { CreateSiteStep, SiteType } from 'types/sites';
import { useSiteCreate } from 'hooks/use-site-create';
import type { Site } from 'types/graphql';

interface Props {
  buttonClassName?: string;
}

const allSteps = [
  CreateSiteStep.Type,
  CreateSiteStep.Details,
  CreateSiteStep.InviteTeam,
  CreateSiteStep.TrackingCode,
  CreateSiteStep.Confirmation,
];

export const CreateModal: FC<Props> = ({ buttonClassName }) => {
  const ref = React.useRef<Modal>();
  const router = useRouter();

  const [siteType, setSiteType] = React.useState<SiteType>(null);
  const [sentInstructions, setSentInstruction] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<CreateSiteStep>(CreateSiteStep.Type);
  const [closeConfirmModalOpen, setCloseConfirmModalOpen] = React.useState<boolean>(false);
 
  const { site, getSite, loading } = useSiteCreate();

  const handleBack = () => {
    const previousStep = allSteps[step - 1];
    if (previousStep !== undefined) setStep(previousStep);
  };

  const handleForward = () => {
    const nextStep = allSteps[step + 1];
    if (nextStep !== undefined) setStep(nextStep);
  };

  const handleSuccess = async () => {
    closeModal(true);
    await router.push(`/sites/${site.id}/dashboard`);
  };

  const handleType = (type: SiteType) => {
    setSiteType(type);
    handleForward();
  };

  const handleDetails = async (site: Site) => {
    getSite({ variables: { siteId: site.id } });
    handleForward();
  };

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (ref.current) ref.current.show();
  };

  const closeModal = (ignoreConfirm = false) => {
    if (ref.current) ref.current.hide(ignoreConfirm);
  };

  const handleConfirmClose = () => {
    // There's no risk if they haven't created
    // a site yet
    site
      ? setCloseConfirmModalOpen(true)
      : closeModal(true);
  };

  const handleConfirmCloseCancel = () => {
    setCloseConfirmModalOpen(false);
  };

  const handleConfirmCloseConfirm = () => {
    if (ref.current) {
      site
        ? handleSuccess()
        : closeModal(true);
    }
  };

  return (
    <>
      <Button className={classnames('new-site', buttonClassName || 'link')} onClick={openModal}>
        + Add New
      </Button>

      <Modal ref={ref} className='lg site-create-modal' onCloseConfirm={handleConfirmClose}>
        <ModalBody>
          <ModalHeader>
            <span className='blank' />
            <Steps steps={allSteps} step={step} />
            <Button className='close' type='button' onClick={() => closeModal()}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <div className='content'>
              {step === CreateSiteStep.Type && (
                <StepType 
                  site={site}
                  siteType={siteType}
                  handleForward={handleType} 
                />
              )}
              {step === CreateSiteStep.Details && (
                <StepDetails 
                  site={site} 
                  siteType={siteType} 
                  loading={loading}
                  handleForward={handleDetails}
                  handleBack={handleBack}
                />
              )}
              {step === CreateSiteStep.InviteTeam && (
                <StepInvite 
                  site={site} 
                  handleForward={handleForward} 
                  handleBack={handleBack} 
                />
              )}
              {step === CreateSiteStep.TrackingCode && (
                <StepTrackingCode
                  site={site} 
                  handleForward={handleForward} 
                  handleBack={handleBack} 
                  handleSuccess={handleSuccess}
                  setSentInstruction={setSentInstruction}
                />
              )}
              {step === CreateSiteStep.Confirmation && (
                <StepConfirmation
                  site={site}
                  sentInstructions={sentInstructions}
                />
              )}
            </div>
          </ModalContents>
        </ModalBody>
      </Modal>

      <CloseConfirmModal 
        open={closeConfirmModalOpen}
        onCloseCancel={handleConfirmCloseCancel}
        onCloseConfirm={handleConfirmCloseConfirm}
      />
    </>
  );
};
