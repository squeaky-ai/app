import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_TEAM_QUERY } from 'data/teams/queries';
import type { Team as TeamMember } from 'types/graphql';

interface Team {
  members: TeamMember[];
}

interface UseSite {
  loading: boolean;
  error: boolean;
  team: Team;
}

const orderTeam = (team: TeamMember[]) => [...team].sort((a, b) => {
  return Number(a.id) - Number(b.id);
});

export const useTeam = (): UseSite => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_TEAM_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    },
    pollInterval: 5000,
  });

  const fallback: Team = {
    members: [],
  };

  return {
    loading,
    error: !!error,
    team: data 
      ? { members: orderTeam(data.site.team) } 
      : fallback
  };
};
