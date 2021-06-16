import type { User } from './user';

export interface Team {
  id: string;
  status: number;
  role: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface TeamInviteInput {
  siteId: string;
  email: string;
  role: number;
}

export interface TeamInviteCancelInput {
  siteId: string;
  teamId: string;
}

export interface TeamInviteResendInput {
  siteId: string;
  teamId: string;
}

export interface TeamUpdateInput {
  siteId: string;
  teamId: string;
  role: number;
}

export interface TeamLeaveInput {
  siteId: string;
}

export interface TeamDeleteInput {
  siteId: string;
  teamId: string;
}
