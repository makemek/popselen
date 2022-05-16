import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Running recaptcha locally for development.
    // Please check repo wiki for more details.
    cors: !!process.env.LOCAL_RECAPTCHA,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(+process.env.PORT || 3300);
}
bootstrap();
