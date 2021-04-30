import { DataSource, DataSourceConfig } from 'apollo-datasource';

declare module 'apollo-datasource' {
  interface DataSource<TContext = any> {
    context: TContext
  }
}

export class UserAPI extends DataSource {
  public initialize(config: DataSourceConfig<any>) {
    this.context = config.context;
  }

  public async get() {
    return this.context.user;
  }
}
