import { Base } from '../base';

export interface Payload {
  token: string;
}

export class Login extends Base {
  private payload: Payload;

  public constructor(email: string, payload: Payload) {
    super(email);
    
    this.payload = payload;
  }

  public get html(): string {
    return `<h1>Your login token is ${this.payload.token}</h1>`;
  }

  public get text(): string {
    return `Your login token is: ${this.payload.token}`;
  }

  public get subject(): string {
    return 'Your log in token for Squeaky';
  }
}
