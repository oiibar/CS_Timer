import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: 'https://cs-timer-six.vercel.app',
    credentials: true,
  });
  // app.enableCors();
  await app.listen(10000, '0.0.0.0');
}
bootstrap();

// https://cs-timer-six.vercel.app
// "start:dev": "kill-port.cmd && nest start --watch",