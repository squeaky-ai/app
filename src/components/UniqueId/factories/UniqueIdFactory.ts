import type { IdGenerator } from '../types/IdGenerator';
import type { IdGeneratorFactory } from '../types/IdGeneratorFactory';

export default class UniqueIdFactory {
  private idGeneratorFactory: IdGeneratorFactory;

  private IdGenerators: Record<string, IdGenerator> = {};

  constructor(idGeneratorFactory: IdGeneratorFactory) {
    this.idGeneratorFactory = idGeneratorFactory;
  }

  nextId(prefix: string): string {
    if (!this.IdGenerators[prefix]) {
      this.IdGenerators[prefix] = this.idGeneratorFactory(prefix);
    }

    return this.IdGenerators[prefix]();
  }
}
