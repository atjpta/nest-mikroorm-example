import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './configs/app.config';
import { ValidationPipe } from '@nestjs/common';
import { responseErrorValidate } from '@base/BaseResponse';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(
    `${AppConfig.getInstance().app.apiPrefix}/${
      AppConfig.getInstance().app.apiVersion
    }`,
  );
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: responseErrorValidate,
    }),
  );
  const port = AppConfig.getInstance().app.port;
  await app.listen(port, async () => {
    const url = await app.getUrl();
    console.log(`Application is running in ${url}`);
  });
}
bootstrap();
