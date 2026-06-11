import { Controller, Post, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { existsSync, mkdirSync } from 'fs';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        // Garantir que a pasta uploads existe
        const uploadPath = './uploads';
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('📁 Arquivo salvo:', file);
    return {
      url: `/uploads/${file.filename}`,
      originalName: file.originalname,
      size: file.size,
    };
  }
}