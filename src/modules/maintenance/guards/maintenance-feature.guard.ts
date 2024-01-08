import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MAINTENANCE_FEATURE_KEY } from '../decorators/maintenance-feature.decorator';
import { IS_AVAILABLE_KEY } from '../decorators/available.decorator';
import { responseMaintenance } from '@base/BaseResponse';
import { RESPONSE_MESSAGE_MAINTENANCE } from '@constants/responseMessage.constant';
import { RESPONSE_CODE_MAINTENANCE } from '@constants/responseCode.constant';
import { MaintenanceType } from '@constants/maintenance.constant';
import { MaintenanceService } from '../maintenance.service';

@Injectable()
export class MaintenanceFeatureGuard implements CanActivate {
  constructor(
    private _maintenanceService: MaintenanceService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const requiredAvailable = this.reflector.getAllAndOverride<string[]>(
      IS_AVAILABLE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (requiredAvailable) {
      return true;
    }

    const requiredAvailableFeature = this.reflector.getAllAndOverride<
      MaintenanceType[]
    >(MAINTENANCE_FEATURE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredAvailableFeature || requiredAvailableFeature.length === 0) {
      return true;
    }

    const maintenance = await this._maintenanceService.checkIsMaintenance(
      requiredAvailableFeature,
    );

    if (maintenance[0]) {
      return responseMaintenance({
        message: RESPONSE_MESSAGE_MAINTENANCE[maintenance[0].type],
        code: RESPONSE_CODE_MAINTENANCE[maintenance[0].type],
        data: maintenance,
      });
    }
    return true;
  }
}
