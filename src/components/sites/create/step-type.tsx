import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { Icon } from 'components/icon';
import { SiteType } from 'types/sites';

interface Props {
  siteType: SiteType;
  handleForward: (siteType: SiteType) => void;
}

export const StepType: FC<Props> = ({ siteType, handleForward }) => (
  <div className='step step-type'>
    <h4>Choose your site type</h4>

    <div className='site-types fade-in'>
      <Button className={classnames({ active: siteType === SiteType.Website })} onClick={() => handleForward(SiteType.Website)}>
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
      <Button className={classnames({ active: siteType === SiteType.WebApp })} onClick={() => handleForward(SiteType.WebApp)}>
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
    </div>
  </div>
);
