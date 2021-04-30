import { DataSource } from 'apollo-datasource';
import { User } from '../entity/user';
import { Jwt } from '../lib/auth/jwt'; 
import { Tokens } from '../lib/auth/token';
import { EmailFactory } from '../lib/email/factory';
import { EmailTypes } from '../lib/email/enums';

type AuthType = 'LOGIN' | 'SIGNUP';

interface AuthRequestResponse {
  jwt: string | null;
  emailSentAt: string | null;
  validation: string | null;
}

export class AuthAPI extends DataSource {
  /**
   * A request that sends a one-time-password to the
   * users email account so that they can confirm that
   * they own the account. We store the token in Redis
   * so that we can verify later
   * @public
   * @param {string} email 
   * @param {AuthType} authType 
   * @returns {Promise<AuthRequestResponse>}
   */
  public async request(email: string, authType: AuthType): Promise<AuthRequestResponse> {
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

    // Generate a new one-time-password and store
    // the value in Redis
    const tokens = new Tokens(email);
    const token = await tokens.create();

    // Send an email to the user with the token so
    // they can verify their email address
    await EmailFactory
      .create(EmailTypes[authType], email, { token })
      .send();

    // An approximate time, but shows the front end
    // that the email was sent
    response.emailSentAt = new Date().toISOString();
    return response;
  }

  /**
   * A request that verifies that the stored token we
   * have matches the one-time-password supplied by the
   * user. If the user is signing up we create the user.
   * We return a JWT so the front end can authenticate.
   * @public
   * @param {string} email 
   * @param {string} token 
   * @param {AuthType} authType 
   * @returns {AuthRequestResponse}
   */
  public async verify(email: string, token: string): Promise<AuthRequestResponse> {
    const response: AuthRequestResponse = {
      jwt: null,
      emailSentAt: null,
      validation: null,
    };

    let user = await User.findOne({ email });

    // Verify that the token provided matches what we
    // have in Redis
    const tokens = new Tokens(email);
    const valid = await tokens.verify(token);

    if (!valid) {
      response.validation = 'Token is incorrect or has expired';
      return response;
    }

    await tokens.delete();
    
    if (!user) {
      user = User.create({ email });
      await user.save();
    }

    response.jwt = Jwt.generate(user.id);
    return response;
  }
}
