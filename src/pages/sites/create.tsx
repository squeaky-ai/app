import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from 'components/main';
import { Steps } from 'components/sites/create/steps';
import { Close } from 'components/sites/create/close';
import { StepType } from 'components/sites/create/step-type';
import { StepDetails } from 'components/sites/create/step-details';
import { StepInvite } from 'components/sites/create/step-invite-team';
import { StepPrivacy } from 'components/sites/create/step-privacy';
import { ServerSideProps, getServerSideProps } from 'lib/auth';
import { CreateSiteStep, SiteType } from 'types/sites';
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

const SitesCreate: NextPage<ServerSideProps> = () => {
  const [step, setStep] = React.useState<CreateSiteStep>(CreateSiteStep.Privacy);

  const [siteType, setSiteType] = React.useState<SiteType>(null);
  const [site, setSite] = React.useState<Site>(null);

  const handleBack = () => {
    const previousStep = allSteps[step -1];
    if (previousStep !== undefined) setStep(previousStep);
  };

  const handleType = (type: SiteType) => {
    setSiteType(type);
    setStep(CreateSiteStep.Details);
  };

  const handleDetails = (site: Site) => {
    setSite(site);
    setStep(CreateSiteStep.InviteTeam);
  };

  const handleInvite = () => {
    setStep(CreateSiteStep.Privacy);
  };

  const handlePrivacy = () => {
    setStep(CreateSiteStep.Consent);
  };
  
  return (
    <>
      <Head>
        <title>Squeaky | Sites | Create</title>
      </Head>

      <Main>
        <div className='header'>
          <span className='blank' />
          <Steps steps={allSteps} step={step} />
          <Close />
        </div>
        <div className='content'>
          {step === CreateSiteStep.Type && (
            <StepType siteType={siteType} handleForward={handleType} />
          )}
          {step === CreateSiteStep.Details && (
            <StepDetails siteType={siteType} handleForward={handleDetails} handleBack={handleBack} />
          )}
          {step === CreateSiteStep.InviteTeam && (
            <StepInvite site={site} handleForward={handleInvite} handleBack={handleBack} />
          )}
          {step === CreateSiteStep.Privacy && (
            <StepPrivacy site={site} handleForward={handlePrivacy} handleBack={handleBack} />
          )}
        </div>
      </Main>
    </>
  );
};

export default SitesCreate;
export { getServerSideProps };
