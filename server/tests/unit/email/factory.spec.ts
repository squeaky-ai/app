import Chance from 'chance';
import { EmailFactory } from '../../../src/lib/email/factory';
import { EmailTypes } from '../../../src/lib/email/enums';
import { Login } from '../../../src/lib/email/types/login';
import { Signup } from '../../../src/lib/email/types/signup';

const chance = Chance();

describe('EmailFactory', () => {
  describe('.create', () => {
    describe('when creating an instance of the `LOGIN` email', () => {
      const email = chance.email();

      it('returns an instance of that class', () => {
        const result = EmailFactory.create(EmailTypes.LOGIN, email, { token: '123456' });
        expect(result).toBeInstanceOf(Login);
      });
    });

    describe('when creating an instance of the `SIGNUP` email', () => {
      const email = chance.email();

      it('returns an instance of that class', () => {
        const result = EmailFactory.create(EmailTypes.SIGNUP, email, { token: '123456' });
        expect(result).toBeInstanceOf(Signup);
      });
    });
  });
});
