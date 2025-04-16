import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const BadRequestExampleSchema = z.object({
  statusCode: z.number().describe("400 status code"),
  message: z.string().describe("Validation failed"),
  errors: z.array(z.object({
    code: z.string().describe("invalid_type"),
    expected: z.string().describe("number"),
    received: z.string().describe("string"),
    path: z.array(z.string().describe("authorId")),
    message: z.string().describe("Expected number, received string"),
  })),
});

// class is required for using DTO as a type
export class BadRequestExampleDto extends createZodDto(BadRequestExampleSchema) {}
