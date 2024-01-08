import { MaintenanceType } from './maintenance.constant';

export const RESPONSE_MESSAGE_DEFAULT = {
  QUERY_SUCCESS: 'Query success!!',
  ERROR_INVALID: 'Please check the input data again!!',
  ERROR_UNAUTHORIZED: 'You do not have access!!',
  ERROR_INTERNAL_SERVER: 'Internal server!!',
  MAINTENANCE: 'System is maintenance!!',
};

export const RESPONSE_MESSAGE_MAINTENANCE = {
  CREATE: 'Create new maintenance success!!',
  FIND_ALL: 'Get list maintenance success!!',
  FIND_BY_ID: 'Get maintenance success!!',
  UPDATE_BY_ID: 'Update maintenance success!!',
  DELETE_BY_ID: 'Delete maintenance success!!',
  [MaintenanceType.ALL]: 'System is maintenance!!',
};
