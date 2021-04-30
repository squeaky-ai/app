import { DataSource } from 'apollo-datasource';
import { User } from '../entity/user';

type AuthType = 'LOGIN' | 'SIGNUP';

interface AuthRequestResponse {
  jwt: string | null;
  emailSentAt: string | null;
  validation: string | null;
}

export class AuthAPI extends DataSource {
  public async request(email: string, authType: AuthType) {
    const response: AuthRequestResponse = {
      jwt: null,
      emailSentAt: null,
      validation: null,
    };

    const user = await User.findOne({ email });

    if (user && authType === 'LOGIN') {
      response.validation = 'User already has an account';
      return response;
    }

    if (!user && authType === 'SIGNUP') {
      response.validation = 'User does not have an account';
      return response;
    }

    // TODO: Store token
    // TODO: Send email

    return {
      jwt: null,
      emailSentAt: new Date().toISOString(),
    }
  }

  public async verify(email: string, token: string, authType: string) {
    console.log('@@', email, token, authType);
    return {
      jwt: 'sdfdsfsdfdsfdsfsdf',
      emailSentAt: null,
    }
  }
}
