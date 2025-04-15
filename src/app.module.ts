import { Module, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validate: (config: Record<string, any>) => {
      const requiredVariables = [
        "NODE_ENV",
        "PORT",
      ];
      const missingVariables = requiredVariables.filter(
        key => !config[key],
      );

      if (missingVariables.length > 0) {
        throw new Error(
          `Missing environment variables: ${missingVariables.join(", ")}`,
        );
      }

      return config;
    },
  }), LoggerModule.forRoot({
    pinoHttp:
      {
        genReqId: () => { return crypto.randomUUID(); },
        level: process.env.NODE_ENV === "production" ? "info" : "debug",
        transport: process.env.NODE_ENV === "production"
          ? undefined
          : { target: "pino-pretty" },
      },
    exclude: [{ method: RequestMethod.ALL, path: "check" }],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
