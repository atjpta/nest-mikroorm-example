import { MaintenanceType } from '@constants/maintenance.constant';
import { SetMetadata } from '@nestjs/common';

export const MAINTENANCE_FEATURE_KEY = 'maintenanceFeature';

export const MaintenanceFeature = (feature: MaintenanceType[]) => {
  return SetMetadata(MAINTENANCE_FEATURE_KEY, feature);
};
