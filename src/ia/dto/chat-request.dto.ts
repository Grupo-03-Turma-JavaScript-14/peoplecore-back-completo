// src/ia/dto/chat-request.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class ChatRequestDto {
  @IsString()
  @IsNotEmpty({ message: 'Mensagem é obrigatória' })
  mensagem!: string;  
}