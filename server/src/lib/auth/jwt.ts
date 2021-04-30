import jwt, { SignOptions } from 'jsonwebtoken';

export class Jwt {
  /**
   * Geneate a new JWT with the current secret
   * and some sensible options for expiry
   * @public
   * @param {number} id 
   * @returns {string}
   */
  public static generate(id: number): string {
    const options: SignOptions = {
      algorithm: 'HS256',
      expiresIn: '30d',
    };

    return jwt.sign({ id }, 'TODO', options);
  }
}
