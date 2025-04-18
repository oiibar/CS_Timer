import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        // host: configService.get('DB_HOST'),
        // port: configService.get('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        host: 'localhost',
        database: 'cstimer',
        username: 'postgres',
        port: 5432,
        password: '123',
        synchronize: true,
        // ssl: {
        //   rejectUnauthorized: true,
        //   ca: fs.readFileSync('src/ca.pem').toString(),
        // },
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
