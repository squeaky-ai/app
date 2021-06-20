export const getDeviceIcon = (_device: string = '') => {
  return 'ri-computer-line'; // TODO
};

export const getDuration = (seconds: number) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};
