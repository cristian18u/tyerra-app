import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const fileUpload = require('express-fileupload')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(fileUpload(
    {
      useTempFiles: true,
      tempFileDir: "./"
    }
  ))
  await app.listen(3000);
}
bootstrap();
