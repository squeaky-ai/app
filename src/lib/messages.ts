import type { Message } from 'types/messages';

export function parseMessage(message: string): Message {
  try {
    return <Message>JSON.parse(message);
  } catch {
    return { key: '__squeaky_unknown', value: {} };
  }
}
