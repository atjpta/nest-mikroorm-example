import { PrimaryKey, Property } from '@mikro-orm/core';

export class BaseEntityCustom {
  @PrimaryKey()
  id: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property({ nullable: true })
  deleteAt: Date = null;
}
