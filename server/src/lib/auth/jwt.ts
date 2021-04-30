import jwt, { SignOptions } from 'jsonwebtoken';

interface Token {
  id: number;
}

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

    const token: Token = { id };

    return jwt.sign(token, 'TODO', options);
  }

  /**
   * Attempt to get the value from the jwt, and
   * raise an appropriate error if it's invalid
   * @public
   * @param {string} value 
   * @returns {number | null}
   */
  public static verify(value: string): number | null {
    try {
      const token = jwt.verify(value, 'TODO') as Token;
      return token.id;
    } catch {
      return null;
    }
  }
}
