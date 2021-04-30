import Chance from 'chance';
import { redis } from '../../../src/config/redis';
import { Tokens } from '../../../src/lib/auth/tokens';

jest.mock('ioredis');

const chance = Chance();

describe('Tokens', () => {
  describe('constructor', () => {
    const email = chance.email();
    const tokens = new Tokens(email);

    it('instantiates an instance of Tokens', () => {
      expect(tokens).toBeInstanceOf(Tokens);
    });
  });

  describe('.create', () => {
    const email = chance.email();
    const tokens = new Tokens(email);

    beforeAll(() => {
      redis.set = jest.fn();
      jest.spyOn(tokens as any, 'generateToken').mockReturnValue('123456');
    });

    it('generates and sets the token', async () => {
      const token = await tokens.create();

      expect(redis.set).toHaveBeenCalledWith(`auth:${email}`, '123456');
      expect(token).toEqual('123456');
    });
  });

  describe('.verify', () => {
    describe('when the token is not stored', () => {
      const email = chance.email();
      const tokens = new Tokens(email);
  
      beforeAll(() => {
        redis.get = jest.fn(async () => null);
      });
  
      it('returns false', async () => {
        const valid = await tokens.verify('123456');
  
        expect(redis.get).toHaveBeenCalledWith(`auth:${email}`);
        expect(valid).toEqual(false);
      });
    });

    describe('when the token is stored but the provided value is wrong', () => {
      const email = chance.email();
      const tokens = new Tokens(email);
  
      beforeAll(() => {
        redis.get = jest.fn(async () => '987654');
      });
  
      it('returns false', async () => {
        const valid = await tokens.verify('123456');
  
        expect(redis.get).toHaveBeenCalledWith(`auth:${email}`);
        expect(valid).toEqual(false);
      });
    });

    describe('when the token is stored and the provided value matches', () => {
      const email = chance.email();
      const tokens = new Tokens(email);
  
      beforeAll(() => {
        redis.get = jest.fn(async () => '123456');
      });
  
      it('returns true', async () => {
        const valid = await tokens.verify('123456');
  
        expect(redis.get).toHaveBeenCalledWith(`auth:${email}`);
        expect(valid).toEqual(true);
      });
    });
  });

  describe('.delete', () => {
    const email = chance.email();
    const tokens = new Tokens(email);

    beforeAll(() => {
      redis.del = jest.fn();
    });

    it('deletes the token', async () => {
      await tokens.delete();

      expect(redis.del).toHaveBeenCalledWith(`auth:${email}`);
    });
  });
});
