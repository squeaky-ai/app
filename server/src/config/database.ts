import path from 'path';
import { Connection, createConnection } from 'typeorm';

const ENTITY_PATH = path.join(__dirname, '..', 'entity');

export async function init(): Promise<Connection> {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'squeaky',
    password: 'squeaky',
    database: 'squeaky',
    synchronize: true,
    entities: [`${ENTITY_PATH}/*`],
  });
}
