import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Icon } from 'components/icon';
import { Tag } from 'components/tag';
import { Dropdown } from 'components/dropdown';
import { PartnerReferredSiteDelete } from 'components/partners/partner-referrered-site-delete';
import type { UsersReferral } from 'types/graphql';
import type { ReferreredSiteColumns } from 'types/admin';

interface Props {
  admin: boolean;
  referral: UsersReferral;
  type: ReferreredSiteColumns;
}

export const PartnerReferreredSite: FC<Props> = ({ admin, referral, type }) => {
  const rowActionsRef = React.useRef<Dropdown>();

  const onRowActionClose = () => {
    if (rowActionsRef.current) rowActionsRef.current.close();
  };

  return (
    <div className={classnames('referred-site', type)}>
      <Icon name={type === 'lead' ? 'fire-line' : 'window-line'} />
      <div className='contents'>
        {type === 'lead' && (
          <p>{referral.url}</p>
        )}
        {type !== 'lead' && (
          <>
            <p>{referral.site.name}</p>
            <p className='url'>{referral.site.url}</p>
            {referral.site.verifiedAt
              ? <Tag className='verified'>Tracking code verified</Tag>
              : <Tag className='unverified'>Tracking code unverified</Tag>
            }
            {type === 'paid' && (
              <p>{referral.site.plan.name} Plan</p>
            )}
          </>
        )}
      </div>
      {type === 'lead' && (
        <div className='action'>
          <Dropdown portal button={<Icon name='more-2-fill' />} buttonClassName='options' ref={rowActionsRef}>
            <PartnerReferredSiteDelete
              admin={admin}
              referral={referral}
              onClose={onRowActionClose}
            />
          </Dropdown>
        </div>
      )}
    </div>
  );
};
