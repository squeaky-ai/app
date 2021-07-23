export const toTimeString = (ms?: number) => {
  if (!ms) return '00:00';

  const date = new Date(0);
  date.setSeconds(ms / 1000);
  return date.toISOString().substr(14, 5);
};

export const toMinutesAndSeconds = (ms?: number) => {
  if (!ms) return '0m 0s';

  const timeString = toTimeString(ms);
  const [minutes, seconds] = timeString.split(':');
  

  return `${minutes.replace('00', '0')}m ${seconds.replace('00', '0')}s`;
};
