import { EmailTypes } from './enums';
import { Login, Payload as LoginPayload } from './types/login';
import { Signup, Payload as SignupPayload } from './types/signup';

type Payload = LoginPayload | SignupPayload;

export class EmailFactory {
  public static create<T extends Payload>(type: EmailTypes, email: string, payload: T) {
    switch(type) {
      case EmailTypes.LOGIN:
        return new Login(email, payload);
      case EmailTypes.SIGNUP:
        return new Signup(email, payload);
      default:
        throw new Error(`Email type ${type} is not valid`);
    }
  }
}
