import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Maintenance } from '../modules/maintenance/entities/maintenance.entity';
import { MaintenanceType } from '@constants/maintenance.constant';

export class MaintenanceSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const maintenance = em.create(Maintenance, {
      type: MaintenanceType.ALL,
      description: 'Maintenance in system',
    });
    em.persistAndFlush(maintenance);
  }
}
