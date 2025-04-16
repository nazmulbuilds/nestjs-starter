import { createZodDto } from "nestjs-zod";
import { z } from "zod";

const ExampleSchema = z.object({
  title: z.string().describe("The title of the example"),
  content: z.string().describe("The content of the example"),
  authorId: z.number().describe("The ID of the author of the example"),
});

// class is required for using DTO as a type
export class ExampleDto extends createZodDto(ExampleSchema) {}
