import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from './entities/maintenance.entity';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { responseSuccess } from '@base/BaseResponse';
import { RESPONSE_CODE_MAINTENANCE } from '@constants/responseCode.constant';
import { RESPONSE_MESSAGE_MAINTENANCE } from '@constants/responseMessage.constant';
import { IsAvailable } from './decorators/available.decorator';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly _maintenanceService: MaintenanceService) {}

  // ================ POST ================

  @Post()
  async create(@Body() createMaintenanceDto: CreateMaintenanceDto) {
    const data = await this._maintenanceService.createDefault(
      new Maintenance(createMaintenanceDto),
    );

    return responseSuccess({
      data: data,
      code: RESPONSE_CODE_MAINTENANCE.CREATE,
      message: RESPONSE_MESSAGE_MAINTENANCE.CREATE,
    });
  }

  // ================ GET ================

  @Get()
  async findAll() {
    const data = await this._maintenanceService.findAllDefault();
    return responseSuccess({
      data: data,
      code: RESPONSE_CODE_MAINTENANCE.FIND_ALL,
      message: RESPONSE_MESSAGE_MAINTENANCE.FIND_ALL,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this._maintenanceService.findById(+id);
    return responseSuccess({
      data,
      code: RESPONSE_CODE_MAINTENANCE.FIND_BY_ID,
      message: RESPONSE_MESSAGE_MAINTENANCE.FIND_BY_ID,
    });
  }

  // ================ PUT ================

  @IsAvailable()
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateMaintenanceDto) {
    const data = await this._maintenanceService.updateDefault(+id, body);
    return responseSuccess({
      data,
      code: RESPONSE_CODE_MAINTENANCE.UPDATE_BY_ID,
      message: RESPONSE_MESSAGE_MAINTENANCE.UPDATE_BY_ID,
    });
  }

  // ================ DELETE ================

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this._maintenanceService.deleteById(+id);
    return responseSuccess({
      code: RESPONSE_CODE_MAINTENANCE.DELETE_BY_ID,
      message: RESPONSE_MESSAGE_MAINTENANCE.DELETE_BY_ID,
    });
  }
}
