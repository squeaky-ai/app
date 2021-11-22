import React from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import { Button } from 'components/button';

interface Props {
  path: string;
  siteId: string;
}

export const SidebarSiteFeedback: FC<Props> = ({ path, siteId }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const active = router.pathname.startsWith('/sites/[site_id]/feedback');
    setOpen(active);
  }, [router.pathname]);

  return (
    <div style={{ display: 'none' }} className={classnames('link nested', { open })} data-label='Feedback'>
      <Button onClick={toggleOpen}>
        <i className='ri-user-voice-line' />
        <span>Feedback</span>
        <i className='arrow ri-arrow-drop-down-line' />
      </Button>
      <div className='items'>
        <Link href={`/sites/${siteId}/feedback/nps`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/feedback/nps`) })}>
            NPS®
          </a>
        </Link>
        <Link href={`/sites/${siteId}/feedback/sentiment`}>
          <a className={classnames('button', { active: path.startsWith(`/sites/${siteId}/feedback/sentiment`) })}>
            Sentiment
          </a>
        </Link>
      </div>
    </div>
  );
};
