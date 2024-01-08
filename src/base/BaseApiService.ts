import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseEntityCustom } from './BaseEntityCustom';

export class BaseApiService<T extends BaseEntityCustom> {
  constructor(
    @InjectRepository('entity')
    private readonly _entityRepo: EntityRepository<T>,
  ) {}

  public async createDefault(data: T): Promise<T> {
    const id = await this._entityRepo.insert(data);
    const records = await this.findById(id);
    return records;
  }

  public async findAllDefault(): Promise<T[]> {
    const records = await this._entityRepo.findAll();
    return records;
  }

  public async findById(id: number): Promise<T> {
    const records = await this._entityRepo.findOne({ id } as T);
    return records;
  }

  public async deleteById(id: number): Promise<number> {
    const records = await this._entityRepo.nativeDelete({ id } as T);
    return records;
  }

  public async updateDefault(id: number, data: unknown): Promise<T> {
    await this._entityRepo.nativeUpdate({ id } as T, data as T);
    const records = await this.findById(id);
    return records;
  }
}
