import React from 'react';
import type { FC } from 'react';
import classnames from 'classnames';
import { Button } from 'components/button';
import { ButtonGroup } from 'components/button-group';
import { AdminSiteType } from 'types/admin';

interface Props {
  type: AdminSiteType;
  setType: (type: AdminSiteType) => void;
}

export const SitesType: FC<Props> = ({ type, setType }) => {
  return (
    <ButtonGroup>
      <Button className={classnames(type === AdminSiteType.All ? 'primary' : 'blank')} onClick={() => setType(AdminSiteType.All)}>
        All
      </Button>
      <Button className={classnames(type === AdminSiteType.Bundled ? 'primary' : 'blank')} onClick={() => setType(AdminSiteType.Bundled)}>
        Bundled
      </Button>
    </ButtonGroup>
  );
};
