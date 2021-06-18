import { User } from '../types/user';
import { Site } from '../types/site';
import { Team } from '../types/team';

export const getTeamMember = (site: Site, user: User): Team | null => {
  if (!site || !user) return null;

  return site.team.find(team => team.user.id.toString() === user.id.toString());
};
