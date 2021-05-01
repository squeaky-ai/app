import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { User } from '../entity/user';

declare module 'apollo-datasource' {
  interface DataSource<TContext = any> {
    context: TContext
  }
}

export class UserAPI extends DataSource {
  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }

  public async get(): Promise<User | null> {
    return this.context.user;
  }
}
