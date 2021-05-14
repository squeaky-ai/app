import { IdGenerator } from './IdGenerator';

export type IdGeneratorFactory = (prefix: string) => IdGenerator;
