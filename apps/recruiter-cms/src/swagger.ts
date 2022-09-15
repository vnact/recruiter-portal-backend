import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { version } from '../package.json';

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Recruiter Portal API')
    .setVersion(version)
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      requestInterceptor: (req) => {
        req.credentials = 'include';
        return req;
      },
    },
    customSiteTitle: 'Recruiter Portal API Docs',
  };

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document, customOptions);
}
