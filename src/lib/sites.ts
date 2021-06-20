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
