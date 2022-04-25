import React from 'react';
import type { FC } from 'react';
import { SidebarNested } from 'components/app/sidebar-nested';

export const SidebarHelp: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div className='sidebar-help'>
      <SidebarNested
        name='Help'
        icon='question-line'
        collapse={() => setOpen(false)}
        expand={() => setOpen(true)}
        expanded={open}
        className='nested-help'
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
};
