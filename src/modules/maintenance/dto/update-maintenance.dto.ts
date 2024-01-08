import { PickType } from '@nestjs/mapped-types';
import { CreateMaintenanceDto } from './create-maintenance.dto';

export class UpdateMaintenanceDto extends PickType(CreateMaintenanceDto, [
  'description',
  'endTime',
  'startTime',
  'isMaintenance',
]) {}
