import { Request } from 'express';
import { Jwt } from './lib/auth/jwt';
import { User } from './entity/user';

interface Context {
  req: Request;
}

export const context = async ({ req }: Context) => {
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
