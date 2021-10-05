import { gql } from '@apollo/client';

export const GET_HEATMAPS_QUERY = gql`
  query GetHeatmaps($siteId: ID!, $page: String!, $device: HeatmapsDevice!, $type: HeatmapsType!) { 
    site(siteId: $siteId) {
      id
      heatmaps(page: $page, device: $device, type: $type) {
        desktopCount
        mobileCount
      }
    }
  }
`;
