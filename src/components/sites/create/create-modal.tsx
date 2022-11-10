import React from 'react';
import type { FC } from 'react';
import { Button } from 'components/button';
import { Steps } from 'components/sites/create/steps';
import { StepType } from 'components/sites/create/step-type';
import { StepDetails } from 'components/sites/create/step-details';
import { StepInvite } from 'components/sites/create/step-invite-team';
import { StepPrivacy } from 'components/sites/create/step-privacy';
import { StepConsent } from 'components/sites/create/step-consent';
import { Modal, ModalBody, ModalContents, ModalHeader } from 'components/modal';
import { CreateSiteStep, SiteType } from 'types/sites';
import { Icon } from 'components/icon';
import { useSiteCreate } from 'hooks/use-site-create';
import type { Site } from 'types/graphql';

const allSteps = [
  CreateSiteStep.Type,
  CreateSiteStep.Details,
  CreateSiteStep.InviteTeam,
  CreateSiteStep.Privacy,
  CreateSiteStep.Consent,
  CreateSiteStep.TrackingCode,
  CreateSiteStep.Confirmation,
];

export const CreateModal: FC = () => {
  const ref = React.useRef<Modal>();

  const [siteType, setSiteType] = React.useState<SiteType>(null);
  const [step, setStep] = React.useState<CreateSiteStep>(CreateSiteStep.Type);
 
  const { site, getSite, loading } = useSiteCreate();

  const handleBack = () => {
    const previousStep = allSteps[step - 1];
    if (previousStep !== undefined) setStep(previousStep);
  };

  const handleForward = () => {
    const nextStep = allSteps[step + 1];
    if (nextStep !== undefined) setStep(nextStep);
  };

  const handleType = (type: SiteType) => {
    setSiteType(type);
    handleForward();
    // TODO: Update site if it exists
  };

  const handleDetails = async (site: Site) => {
    getSite({ variables: { siteId: site.id } });
    handleForward();
  };

  const openModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (ref.current) ref.current.show();
  };

  const closeModal = () => {
    if (ref.current) ref.current.hide();
  };

  return (
    <>
      <Button className='link new-site' onClick={openModal}>
        + Add New
      </Button>

      <Modal ref={ref} className='lg site-create-modal'>
        <ModalBody>
          <ModalHeader>
            <span className='blank' />
            <Steps steps={allSteps} step={step} />
            <Button className='close' type='button' onClick={closeModal}>
              <Icon name='close-line' />
            </Button>
          </ModalHeader>
          <ModalContents>
            <div className='content'>
              {step === CreateSiteStep.Type && (
                <StepType 
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
              {step === CreateSiteStep.Privacy && (
                <StepPrivacy 
                  site={site} 
                  handleForward={handleForward} 
                  handleBack={handleBack} 
                />
              )}
              {step === CreateSiteStep.Consent && (
                <StepConsent
                site={site} 
                handleForward={handleForward} 
                handleBack={handleBack} 
                />
              )}
            </div>
          </ModalContents>
        </ModalBody>
      </Modal>
    </>
  );
};
