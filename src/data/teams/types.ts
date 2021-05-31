import { User } from 'data/users/types';

export interface Team {
  id: string;
  status: number;
  role: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}
