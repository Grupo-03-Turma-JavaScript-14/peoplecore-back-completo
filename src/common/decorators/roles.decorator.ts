import { SetMetadata } from '@nestjs/common';
import { GlobalRole } from '../enums/global-role.enum';
import { CompanyRole } from '../enums/company-role.enum';

export const ROLES_KEY = 'roles';

export type AppRole = GlobalRole | CompanyRole;

export const Roles = (...roles: AppRole[]) => {
  return SetMetadata(ROLES_KEY, roles);
};