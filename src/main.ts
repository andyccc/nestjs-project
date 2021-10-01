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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalInterceptors(new TransformInterceptor());

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
