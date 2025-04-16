import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { LibSQLDatabase } from "drizzle-orm/libsql";

import { DATABASE_CONNECTION } from "../database/database-connection";
import * as schema from "./schema";

@Injectable()
export class ExmaplesService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: LibSQLDatabase<typeof schema>,
  ) {}

  async create(data: schema.InsertExamplesDto): Promise<any> {
    const [insertedRow] = await this.db.insert(schema.examples).values(data).returning();

    // const insertedRow = await this.db.query.examples.findFirst({
    //   where: (examples, { eq }) => eq(examples.id, Number(result.lastInsertRowid)),
    // });

    // return insertedRow;
    return insertedRow;
  }

  async getAll() {
    return this.db.query.examples.findMany();
  }

  async getById(id: string) {
    const example = await this.db.query.examples.findFirst({
      where: (examples, { eq }) => eq(examples.id, Number(id)),
    });

    if (!example) {
      throw new NotFoundException("Example not found");
    }

    return example;
  }
}
