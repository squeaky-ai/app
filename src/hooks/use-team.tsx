import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { useToasts } from 'hooks/use-toasts';
import { GET_TEAM_QUERY } from 'data/teams/queries';
import type { Team as TeamMember } from 'types/graphql';

interface Team {
  members: TeamMember[];
  teamSizeExceeded: boolean;
}

interface UseSite {
  loading: boolean;
  error: boolean;
  team: Team;
}

export const useTeam = (): UseSite => {
  const router = useRouter();
  const toasts = useToasts();

  const { loading, error, data } = useQuery(GET_TEAM_QUERY, {
    variables: {
      siteId: router.query.site_id as string
    }
  });

  if (error) {
    toasts.add({ type: 'error', body: 'An error has occurred' });
  }

  const fallback: Team = {
    members: [],
    teamSizeExceeded: true,
  };

  return {
    loading,
    error: !!error,
    team: data 
      ? { members: data.site.team, teamSizeExceeded: data.site.teamSizeExceeded } 
      : fallback
  };
};
