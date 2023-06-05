import React from 'react';
import type { FC } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Button } from 'components/button';
import { GET_AD_TRACKING_EXPORT_QUERY } from 'data/admin/queries';
import type { Admin, AdminAdTracking, AdminAdTrackingSort } from 'types/graphql';
import type { TimeRange } from 'types/common';

interface Props {
  utmContentIds: string[];
  sort: AdminAdTrackingSort;
  adTracking: AdminAdTracking;
  range: TimeRange;
}

export const AdTrackingExport: FC<Props> = ({ utmContentIds, sort, adTracking, range}) => {
  const [getExport, { loading }] = useLazyQuery<{ admin: Admin }>(GET_AD_TRACKING_EXPORT_QUERY, {
    variables: {
      utmContentIds,
      sort: sort,
      ...range,
    },
  });

  const handleClick = async () => {
    const { data } = await getExport();
    const response = data.admin.adTrackingExport;

    const blob = new Blob([response], { type: 'text/csv' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = 'ad-tracking-export.csv';
    
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Button className='button secondary' onClick={handleClick} disabled={loading || adTracking.items.length === 0}>
      Export .csv
    </Button>
  );
};
