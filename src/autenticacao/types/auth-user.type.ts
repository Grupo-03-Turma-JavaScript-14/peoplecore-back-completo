import { GlobalRole } from "../../common/enums/global-role.enum";

export type AuthUser = {
  id: number;
  usuario: string;
  globalRole: GlobalRole;
  empresaId?: number;
};