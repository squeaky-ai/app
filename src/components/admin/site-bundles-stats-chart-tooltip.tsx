import React from 'react';
import type { FC } from 'react';
import { ChartTooltip, ChartTooltipProps, Label, Value } from 'components/sites/chart-tooltip';
import { colorsPrimaryAdmin } from 'lib/colors';
import type { AdminSite } from 'types/graphql';

interface Props {
  sites: AdminSite[];
}

type KeyToSite = {
  id: string;
  name: string;
  count: string | number;
};

const mapKeysToSites = (data: Record<string, string | number>, sites: AdminSite[]): KeyToSite[] => {
  return Object
    .entries(data)
    .filter((([key]) => key !== 'dateKey'))
    .map(([key, value]) => {
      const site = sites.find(site => site.id === key.replace('site-id-', ''));

      return {
        id: site.id,
        name: site.name,
        count: value,
      };
    });
};

export const SiteBundlesStatsChartTooltip: FC<ChartTooltipProps & Props> = (props) => (
  <ChartTooltip {...props}>
    {({ data }) => (
      <>
        {mapKeysToSites(data, props.sites).map((result, index) => (
          <React.Fragment key={result.id}>
            <Label>{result.name}</Label>
            <Value color={colorsPrimaryAdmin[index]?.stroke}>{(data.count || 0).toLocaleString()}</Value>
          </React.Fragment>
        ))}
      </>
    )}
  </ChartTooltip>
);
