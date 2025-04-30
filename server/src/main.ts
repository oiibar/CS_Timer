import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://cs-timer-six.vercel.app',
    credentials: true,
  });
  await app.listen(10000, '0.0.0.0');
}
bootstrap();

// "start:dev": "kill-port.cmd && nest start --watch",