import { SES } from 'aws-sdk';

export abstract class Base {
  protected email: string;

  public constructor(email: string) {
    this.email = email;
  }

  public async send(): Promise<void> {
    const client = new SES({ region: 'eu-west-1' });
    await client.sendEmail(this.params).promise();
  }

  abstract get html(): string;
  abstract get text(): string;
  abstract get subject(): string;

  private get params(): SES.SendEmailRequest {
    return {
      Destination: {
        ToAddresses: [this.email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: this.html,
          },
          Text: {
            Charset: 'UTF-8',
            Data: this.text,
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: this.subject,
        }
      },
      Source: 'Squeaky.ai <hello@squeaky.ai>',
    };
  }
}