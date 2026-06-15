import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

import { CompanyRole } from '../../common/enums/company-role.enum';

import { EsocialService } from '../services/esocial.service';

@ApiTags('eSocial')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(CompanyRole.ADMIN, CompanyRole.RH)
@Controller('esocial')
export class EsocialController {
  constructor(private readonly service: EsocialService) {}

  // ======================
  // S-2200
  // ======================

  @Post('s2200')
  gerarS2200(@Body() dados: any) {
    const xml = this.service.gerarS2200(dados);
    return {
      xml,
      valido: this.service.validarXml(xml).valido,
    };
  }

  // ======================
  // S-2299
  // ======================

  @Post('s2299')
  gerarS2299(@Body() dados: any) {
    const xml = this.service.gerarS2299(dados);
    return {
      xml,
      valido: this.service.validarXml(xml).valido,
    };
  }

  // ======================
  // VALIDAR XML

  @Post('validar')
  validarXml(@Body('xml') xml: string) {
    return this.service.validarXml(xml);
  }
}