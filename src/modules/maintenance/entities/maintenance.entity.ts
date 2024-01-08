import { BaseEntityCustom } from '@base/BaseEntityCustom';
import { Entity, Property } from '@mikro-orm/core';
import { CreateMaintenanceDto } from '../dto/create-maintenance.dto';

@Entity()
export class Maintenance extends BaseEntityCustom {
  @Property()
  type: string;

  @Property({ nullable: true })
  description: string;

  @Property({ nullable: true })
  startTime: Date;

  @Property({ nullable: true })
  endTime: Date;

  @Property()
  isMaintenance: boolean;

  constructor(data: CreateMaintenanceDto) {
    super();
    this.type = data.type;
    this.description = data.description ?? null;
    this.startTime = data.startTime ? new Date(data.startTime) : null;
    this.endTime = data.endTime ? new Date(data.endTime) : null;
    this.isMaintenance = data.isMaintenance ?? false;
  }
}
