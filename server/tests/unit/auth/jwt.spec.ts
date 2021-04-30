import Chance from 'chance';
import { Jwt } from '../../../src/lib/auth/jwt';

const chance = Chance();

describe('Jwt', () => {
  describe('.generate', () => {
    const id = chance.integer();

    it('returns a jwt', () => {
      const jwt = Jwt.generate(id);
      expect(jwt).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
    });
  });
});
