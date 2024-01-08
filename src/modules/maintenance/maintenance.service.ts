import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Maintenance } from './entities/maintenance.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { BaseApiService } from '@base/BaseApiService';
import { MaintenanceType } from '@constants/maintenance.constant';

@Injectable()
export class MaintenanceService extends BaseApiService<Maintenance> {
  constructor(
    @InjectRepository(Maintenance)
    private readonly _maintenanceRepo: EntityRepository<Maintenance>,
  ) {
    super(_maintenanceRepo);
  }

  public async checkIsMaintenance(
    listType: MaintenanceType[],
  ): Promise<Maintenance[]> {
    const record = await this._maintenanceRepo.findAll({
      where: {
        type: {
          $in: listType,
        },
        isMaintenance: true,
      },
    });
    return record;
  }
}
