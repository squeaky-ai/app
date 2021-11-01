import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $page: String!, $fromDate: String!, $toDate: String!, $device: HeatmapsDevice!, $type: HeatmapsType!) { 
    site(siteId: $siteId) {
      id
      heatmaps(page: $page, device: $device, fromDate: $fromDate, toDate: $toDate, type: $type) {
        desktopCount
        mobileCount
        items {
          x
          y
          selector
        }
      }
    }
  }
`;
