export interface User {
  email: string;
}

export interface RequestAuthMutationResponse {
  authRequest: {
    emailSentAt: string;
  };
}

export interface VerifyAuthMutationResponse {
  authVerify: {
    expiresAt: string;
    jwt: string;
    user: User;
  };
}
