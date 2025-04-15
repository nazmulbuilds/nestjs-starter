import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true, cors: {
    origin: true,
    credentials: true,
  } });

  app.useLogger(app.get(Logger));
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
