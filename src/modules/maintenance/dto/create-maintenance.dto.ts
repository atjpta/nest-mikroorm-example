import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateMaintenanceDto {
  @IsString()
  type: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  startTime: string;

  @IsString()
  @IsOptional()
  endTime: string;

  @IsBoolean()
  @IsOptional()
  isMaintenance: boolean = false;
}
