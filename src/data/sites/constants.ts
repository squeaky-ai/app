// Should match
// - www.google.com
// - google.com
// - google.co.uk
// - news.google.com
export const HOSTNAME_REGEX = /^([a-zA-Z0-9](?:(?:[a-zA-Z0-9-]*|(?<!-)\.(?![-.]))*[a-zA-Z0-9]+)?)$/;
