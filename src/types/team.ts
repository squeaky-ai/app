import type { User } from './user';

export interface Team {
  id: string;
  status: number;
  role: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}
