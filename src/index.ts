import { BaseHttpExceptionFilter } from './exceptions/HttpExceptionFilter';
import { MaintenanceFeatureGuard } from './modules/maintenance/guards/maintenance-feature.guard';
import { MaintenanceGuard } from './modules/maintenance/guards/maintenance.guard';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';

export const APP_MODULES = [MaintenanceModule];

export const APP_FILTERS = [BaseHttpExceptionFilter];

export const APP_GUARDS = [MaintenanceGuard, MaintenanceFeatureGuard];
