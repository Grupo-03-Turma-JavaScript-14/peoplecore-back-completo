// src/ia/controllers/ia.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { IaService } from '../services/ia.service';  // ← caminho corrigido
import { ChatRequestDto } from '../dto/chat-request.dto';  // ← caminho corrigido
import { JwtAuthGuard } from '../../autenticacao/guards/jwt-auth.guard';  // ← caminho corrigido

@Controller('ia')
@UseGuards(JwtAuthGuard)
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('chat')
  async chat(
    @Request() req,
    @Body() chatRequest: ChatRequestDto,
  ) {
    console.log('IaController - Chat request received:', chatRequest);
    
    const { mensagem } = chatRequest;
    
    if (!mensagem || mensagem.trim() === '') {
      return {
        success: false,
        message: 'Mensagem não pode ser vazia',
        resposta: null,
      };
    }
    
    const empresaId = req.user?.empresaId || null;
    
    const response = await this.iaService.processarMensagem(mensagem, empresaId);
    
    return {
      success: true,
      resposta: response,
    };
  }
}