import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import global valid pipe to check submit params
import { ValidationPipe } from './common/pipes/validation.pipe'

// import global filter 
import { HttpExceptionFilter } from './common/filters/http-exceptin.filter'

// import global interceptor
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

// import swagger document helper
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/any-exception.filter';
// import { logger } from './common/middleware/logger.middleware';
// import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useLogger(logger)

  // app.useLogger(app.get(Logger));

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalFilters(new AllExceptionsFilter());


  app.useGlobalInterceptors(new TransformInterceptor());

  // app.setGlobalPrefix('api')
  app.enableCors() // 启用允许跨域

  const config = new DocumentBuilder()
    .setTitle('nest user api example')
    .setDescription('The nest user api description')
    .setVersion('1.0')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
