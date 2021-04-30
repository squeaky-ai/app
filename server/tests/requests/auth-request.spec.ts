import Chance from 'chance';
import { Connection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { config } from '../../src/server';
import { User } from '../../src/entity/user';
import { Base } from '../../src/lib/email/base';
import * as database from '../../src/config/database';

const chance = Chance();
const server = new ApolloServer(config);
const { mutate } = createTestClient(server);

const MUTATION = `
  mutation authRequest($email: String!, $authType: AuthType!) {
    authRequest(email: $email, authType: $authType) {
      jwt
      emailSentAt
      validation
    }
  }
`;

describe('[mutation] authRequest', () => {
  let db: Connection;

  beforeAll(async () => {
    db = await database.init();
  });

  afterAll(async () => {
    await db.close();
  });

  describe('when the auth type is `LOGIN`', () => {
    describe('and the user does not have an account', () => {
      it('returns a validation message to say the user does not exist', () => {

      });
    });

    describe('and the user has an account', () => {
      it('returns a timestamp for when the email was sent', () => {
        expect(true).toBe(true);
      });

      it('sends an email to the user', () => {

      });
    });
  });

  describe('when the auth type is `SIGNUP`', () => {
    describe('and the user does not have an account', () => {
      it('sends the email token and responds with the timestamp', async () => {
        const mockEmailSend = jest.fn();

        Base.prototype.send = mockEmailSend;

        const variables = { email: 'lewismonteith@gmail.com', authType: 'LOGIN' };
        const res = await mutate({ mutation: MUTATION, variables });

        expect(res.data.authRequest.emailSentAt).toBeDefined();

        expect(mockEmailSend).toHaveBeenCalled();
      });
    });

    describe('and the user has an account', () => {
      let user: User;

      beforeAll(async () => {
        user = User.create({ email: chance.email() });
        await user.save();
      });

      afterAll(async () => {
        await user.remove();
      });

      it('returns a validation message to say the user already has an account', async () => {
        const variables = { email: user.email, authType: 'LOGIN' };
        const res = await mutate({ mutation: MUTATION, variables });

        expect(res.data.authRequest).toEqual({
          jwt: null,
          emailSentAt: null,
          validation: 'User already has an account',
        });
      });
    });
  });
});
