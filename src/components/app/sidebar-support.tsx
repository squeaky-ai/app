import React from 'react';
import type { FC } from 'react';
import { SidebarNested } from 'components/app/sidebar-nested';

interface Props {
  expanded: boolean;
  expand: VoidFunction;
  collapse: VoidFunction;
}

export const SidebarSupport: FC<Props> = ({ expand, collapse, expanded }) => (
  <div className='sidebar-support'>
    <SidebarNested
      name='Support'
      icon='question-line'
      collapse={collapse}
      expand={expand}
      expanded={expanded}
      className='nested-support'
    >
      <a className='button' href='https://squeaky.notion.site/Squeaky-Help-Centre-fc049a1822b94b7a8df362811c534d4b' target='_blank' rel='noreferrer'>
        Help center
      </a>
      <a className='button' href='/legal/terms-of-service' target='_blank'>
        Terms of service
      </a>
      <a className='button' href='/legal/privacy-policy' target='_blank'>
        Privacy Policy
      </a>
    </SidebarNested>
  </div>
);
