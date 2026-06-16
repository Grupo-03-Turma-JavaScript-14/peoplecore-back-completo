import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable() 
export class DevService {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    
    const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

    return {
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: isNaN(dbPort) ? 3306 : dbPort,
      username: process.env.DB_USERNAME ?? 'root',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_DATABASE ?? 'peoplecore',

      
      autoLoadEntities: true,


      synchronize: true,
      logging: true,
    };
  }
}