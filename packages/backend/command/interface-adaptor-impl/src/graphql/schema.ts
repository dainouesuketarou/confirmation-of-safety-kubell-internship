import { GraphQLSchema } from "graphql/type";
import { buildSchema } from "type-graphql";
import { GroupChatCommandResolver } from "./resolvers";
import path from "path";

async function createCommandSchema(): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers: [GroupChatCommandResolver],
    emitSchemaFile: path.resolve(__dirname, "command.schema.graphql"),
    validate: false,
  });
}

export { createCommandSchema };
