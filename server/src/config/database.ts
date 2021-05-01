import path from 'path';
import { Connection, createConnection } from 'typeorm';
import { config } from './config';

const ENTITY_PATH = path.join(__dirname, '..', 'entity');

export async function init(): Promise<Connection> {
  return createConnection({
    type: 'postgres',
    url: config.DATABASE_URL,
    synchronize: true,
    entities: [`${ENTITY_PATH}/*`],
  });
}
