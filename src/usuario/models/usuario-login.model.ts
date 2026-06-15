import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogin {
  @ApiProperty({ example: 'admin@peoplecore.com.br' })
  @IsNotEmpty()
  @IsString()
  usuario!: string;

  @ApiProperty({ example: 'admin123' })
  @IsNotEmpty()
  @IsString()
  senha!: string;
}