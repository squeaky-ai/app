import { redis } from '../../config/redis';

export class Tokens {
  private email: string;

  public constructor(email: string) {
    this.email = email;
  }

  /**
   * Create the key that the auth token will be
   * stored against
   * @private
   * @return {string}
   */
  private get key(): string {
    return `auth:${this.email}`;
  }

  /**
   * Generate an auth 6 digit one-time-password,
   * by having it in a seperate method we can 
   * easilly mock the return value in tests
   * @private
   * @returns {string}
   */
  private generateToken(): string {
    return '' + Math.floor(100000 + Math.random() * 900000);
  }

  /**
   * Create a new one-time-password and store the
   * value in redis against the users email
   * @public
   * @returns {Promise<string>}
   */
  public async create(): Promise<string> {
    const token = this.generateToken();
    await redis.set(this.key, token);
    return token;
  }

  /**
   * Verify that the token the user supplied matches
   * the token we have stored. We should silently
   * fail if the token doesn't exist so people can't
   * spam this endpoint to check for emails
   * @public
   * @param {string} token 
   * @returns {Promise<boolean>}
   */
  public async verify(token: string): Promise<boolean> {
    const value = await redis.get(this.key);
    return value === token;
  }

  /**
   * Clean up the token from the database so we don't
   * accumulate loads of keys over time
   * @public
   * @return {Promise<void>}
   */
  public async delete(): Promise<void> {
    await redis.del(this.key);
  }
}