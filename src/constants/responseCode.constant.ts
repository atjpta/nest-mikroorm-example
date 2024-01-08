import { MaintenanceType } from './maintenance.constant';

export const RESPONSE_CODE_DEFAULT = {
  SUCCESS: 'success000',
  ERROR: 'error000',
  ERROR_INVALID: 'invalid000',
  ERROR_BAD_REQUEST: 'babRequest000',
  ERROR_UNAUTHORIZED: 'unauthorized000',
  ERROR_INTERNAL_SERVER: 'internalServer000',
  MAINTENANCE: 'maintenance000',
};

export const RESPONSE_CODE_MAINTENANCE = {
  CREATE: 'SM001',
  FIND_ALL: 'SM002',
  FIND_BY_ID: 'SM003',
  UPDATE_BY_ID: 'SM004',
  DELETE_BY_ID: 'SM005',
  //
  [MaintenanceType.ALL]: 'EM001',
};
