import { Request } from 'express';
import { Jwt } from './lib/auth/jwt';
import { User } from './entity/user';

import { AuthAPI } from './datasources/auth';
import { UserAPI } from './datasources/user';

interface RequestContext {
  req: Request;
}

export interface Context {
  user: User | null;
  dataSources: {
    authAPI: AuthAPI,
    userAPI: UserAPI,
  }
}

export const context = async ({ req }: RequestContext) => {
  const { operationName } = req.body;
  // This occurs in the playground as it polls for
  // the schema, there is nothing here to auth
  if (operationName === 'IntrospectionQuery') return;

  const bearer = req.headers.authorization || '';
  const token = bearer.split('Bearer ')[1];

  const id = Jwt.verify(token || '');
  const user = id ? await User.findOneOrFail(id) : null;

  return { user };
};
