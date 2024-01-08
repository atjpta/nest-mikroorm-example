import { SetMetadata } from '@nestjs/common';

export const IS_AVAILABLE_KEY = 'available';
export const IsAvailable = () => SetMetadata(IS_AVAILABLE_KEY, true);
