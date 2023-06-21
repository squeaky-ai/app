import React from 'react';
import type { FC } from 'react';
import { SidebarNested } from 'components/app/sidebar-nested';
import { Icon } from 'components/icon';
import { SidebarChangelog } from 'components/app/sidebar-changelog';
import { useChangelogPosts } from 'hooks/use-changelog-posts';
import { useFeatureFlags } from 'hooks/use-feature-flags';
import { FeatureFlag } from 'lib/feature-flags';
import type { User } from 'types/graphql';

interface Props {
  user: User;
  expanded: boolean;
  expand: VoidFunction;
  collapse: VoidFunction;
}

export const SidebarSupport: FC<Props> = ({ user, expand, collapse, expanded }) => {
  const { posts } = useChangelogPosts();
  const { featureFlagEnabled } = useFeatureFlags();

  const [changelogLastViewedAt, setChangelogLastViewedAt] = React.useState<Date>(
    user?.changelogLastViewedAt ? new Date(user.changelogLastViewedAt.iso8601) : null
  );

  const changelogLength = featureFlagEnabled(FeatureFlag.CHANGELOG)
    ? changelogLastViewedAt
      ? posts.filter(p => new Date(p.createdAt.iso8601) > changelogLastViewedAt).length
      : posts.length
    : 0;

  return (
    <div className='sidebar-support'>
      <SidebarNested
        name='Support'
        icon='question-line'
        collapse={collapse}
        expand={expand}
        expanded={expanded}
        className='nested-support'
        counter={changelogLength}
      >
        <a className='button external-link' href='https://squeaky.notion.site/Squeaky-Help-Centre-fc049a1822b94b7a8df362811c534d4b' target='_blank' rel='noreferrer'>
          <span>Help center</span> <Icon name='external-link-line' />
        </a>
        <SidebarChangelog 
          disabled={posts.length === 0 || !featureFlagEnabled(FeatureFlag.CHANGELOG)}
          changelogLength={changelogLength}
          posts={posts}
          setChangelogLastViewedAt={setChangelogLastViewedAt}
        />
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
