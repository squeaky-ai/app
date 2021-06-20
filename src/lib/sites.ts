import { User } from 'types/user';
import { Site } from 'types/site';
import { Team } from 'types/team';

export const getTeamMember = (site: Site, user: User): Team | null => {
  if (!site?.team || !user) return null;

  return site.team.find(team => team.user.id.toString() === user.id.toString());
};

export const getDeviceIcon = (device: string = '') => {
  // TODO this list will need to change
  switch(device.toLowerCase()) {
    case 'mobile':
      return 'ri-smartphone-line';
    case 'tablet':
      return 'ri-tablet-line';
    default:
      return 'ri-computer-line';
  }
};

export const getDuration = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};
