import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import { SessionsModule } from './sessions/sessions.module';
import { UserModule } from './user/user.module';
import * as fs from 'fs';

@Module({
  imports: [
    UserModule,
    AuthModule,
    SessionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions  => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        ssl: {
          rejectUnauthorized: true,
          ca: fs.readFileSync('src/ca.pem').toString(),
        },
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
    }),
  ],
})
export class AppModule {}
