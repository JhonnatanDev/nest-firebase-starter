import { INestApplication, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationException } from './common/exceptions/validation.exception';
import { isLocal } from './common/helpers/environment.helper';

async function AppStart() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  await app.listen(3000);
}

function swaggerConfig(app: INestApplication){

  app.useGlobalPipes(
    //Add Global Validation Pipe to integrate with class-validator
    new ValidationPipe({
      transform: true,
      validationError: {
        target: false, 
        value: false
      },
      exceptionFactory: (errors: ValidationError[]) => new ValidationException(errors),
    })
  )
  if(isLocal()){
    const title = 'API Documentation';
    const options = new DocumentBuilder()
      .setTitle(title)
      .setDescription('REST API for local development testing')
      .build();

      const document = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup('/swagger', app, document, {
        customSiteTitle: title,
      })
  }
}

AppStart();
