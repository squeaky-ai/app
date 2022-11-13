import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { SiteType } from 'types/sites';
import { updateSite } from 'lib/api/graphql';
import { useToasts } from 'hooks/use-toasts';
import type { Site } from 'types/graphql';

interface Props {
  site?: Site;
  siteType: SiteType;
  handleForward: (siteType: SiteType) => void;
}

export const StepType: FC<Props> = ({ site, siteType, handleForward }) => {
  const toasts = useToasts();

  const handleSetType = async (siteType: SiteType) => {
    try {
      if (site) {
        await updateSite({ siteId: site.id, siteType });
      }

      handleForward(siteType);
    } catch(error: any) {
      console.error(error);
      toasts.add({ type: 'error', body: 'There was an error updating your site' });
    }
  };

  return (
    <div className='step step-type'>
      <p className='subheading' />
      <h4>Choose your site type</h4>
      <div className='details'>
        <p />
      </div>

      <div className='site-types fade-in'>
        <Button className={classnames({ active: siteType === SiteType.Website })} onClick={() => handleSetType(SiteType.Website)}>
          <Icon name='pages-line' />
          <h5>Website</h5>
          <p>Websites are typically created for people wanting to source information, consume content, or make purchases.</p>
          <p><b>Examples include:</b></p>
          <ul>
            <li>Marketing and sales websites</li>
            <li>eCommerce stores</li>
            <li>News media</li>
            <li>Blogs</li>
            <li>Personal websites</li>
          </ul>
        </Button>
        <Button className={classnames({ active: siteType === SiteType.WebApp })} onClick={() => handleSetType(SiteType.WebApp)}>
          <Icon name='pie-chart-box-line' />
          <h5>Web app</h5>
          <p>Web apps are interactive sites that are similar to conventional software programs but accessible using your web browser.</p>
          <p><b>Examples include:</b></p>
          <ul>
            <li>Email clients</li>
            <li>Project management software</li>
            <li>Cloud storage systems</li>
            <li>Document and spreadsheet tools</li>
            <li>This app you&apos;re using now!</li>
          </ul>
        </Button> 

        <div className='footer' />
      </div>
    </div>
  );
};
