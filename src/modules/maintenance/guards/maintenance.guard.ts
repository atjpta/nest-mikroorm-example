import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { MaintenanceService } from '../maintenance.service';
import { IS_AVAILABLE_KEY } from '../decorators/available.decorator';
import { MaintenanceType } from '@constants/maintenance.constant';
import { responseMaintenance } from '@base/BaseResponse';
import { RESPONSE_MESSAGE_MAINTENANCE } from '@constants/responseMessage.constant';
import { RESPONSE_CODE_MAINTENANCE } from '@constants/responseCode.constant';

@Injectable()
export class MaintenanceGuard implements CanActivate {
  constructor(
    private _maintenanceService: MaintenanceService,
    private reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext) {
    const requiredAvailable = this.reflector.getAllAndOverride<string[]>(
      IS_AVAILABLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiredAvailable) {
      return true;
    }
    const maintenance = await this._maintenanceService.checkIsMaintenance([
      MaintenanceType.ALL,
    ]);

    if (maintenance[0]) {
      return responseMaintenance({
        message: RESPONSE_MESSAGE_MAINTENANCE[MaintenanceType.ALL],
        code: RESPONSE_CODE_MAINTENANCE[MaintenanceType.ALL],
        data: maintenance,
      });
    }
    return true;
  }
}
