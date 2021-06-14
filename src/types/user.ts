export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  lastSignedInAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserMutationInput {
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserMutationResponse {
  user?: User;
  error?: { [key: string]: string };
}
