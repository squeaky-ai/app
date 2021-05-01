interface Config {
  DATABASE_URL: string;
  REDIS_URL: string;
  SECRET_KEY_BASE: string;
}

export const config: Config = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  SECRET_KEY_BASE: process.env.SECRET_KEY_BASE as string,
  REDIS_URL: process.env.REDIS_URL as string,
};
