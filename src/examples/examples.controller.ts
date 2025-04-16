import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ZodSerializerDto } from "nestjs-zod";

import { BadRequestExampleDto } from "./dtos/bad-request-example.dto";
import { ExampleDto } from "./dtos/example.dto";

@Controller("examples")
@ApiTags("Examples Section")
// @ApiBearerAuth()
export class ExamplesController {
  @Post()
  @ApiOkResponse({ type: ExampleDto, description: "Create example" })
  @ApiBadRequestResponse({ type: BadRequestExampleDto, description: "Bad request example" })
  createPost(@Body() body: ExampleDto) {
    return body;
  }

  @Get()
  @ApiOkResponse({ type: [ExampleDto], description: "Get all examples" })
  getAll() {
    return [];
  }

  @Get(":id")
  @ZodSerializerDto(ExampleDto)
  @ApiOkResponse({ type: ExampleDto, description: "Get a example by ID" })
  // eslint-disable-next-line unused-imports/no-unused-vars
  getById(@Param("id") id: string) {
    return {
      title: "Hello",
      content: "World",
      authorId: 1,
    };
  }
}
