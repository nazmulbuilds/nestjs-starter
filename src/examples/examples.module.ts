import { Module } from "@nestjs/common";

import { ExamplesController } from "./examples.controller";

@Module({
  controllers: [ExamplesController],
})
export class ExamplesModule {}
