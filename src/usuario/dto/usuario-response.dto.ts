import { GlobalRole } from "../../common/enums/global-role.enum";
import { CompanyRole } from "../../common/enums/company-role.enum";

export class UsuarioResponseDto {
  id!: number;
  nome!: string;
  usuario!: string;
  foto?: string;

  // 🌍 nível plataforma
  globalRole?: GlobalRole;

  // 🏢 nível empresa
  companyRole?: CompanyRole;

  empresaId?: number;
}