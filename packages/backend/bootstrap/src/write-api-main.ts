import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  convertJSONToGroupChat,
  convertJSONToGroupChatEvent,
  GroupChat,
  GroupChatEvent,
  GroupChatId,
} from "cqrs-es-example-js-command-domain";
import {
  CommandContext,
  createCommandSchema,
  GroupChatRepositoryImpl,
} from "cqrs-es-example-js-command-interface-adaptor-impl";
import { GroupChatCommandProcessor } from "cqrs-es-example-js-command-processor";
import { EventStoreFactory } from "event-store-adapter-js";
import { logger } from "./index";

async function writeApiMain() {
  const apiHost = process.env.API_HOST ?? "localhost";
  const apiPort = parseInt(process.env.API_PORT ?? "38080");

  const awsRegion = process.env.AWS_REGION ?? "ap-northeast-1";
  const awsDynamodbEndpointUrl =
    process.env.AWS_DYNAMODB_ENDPOINT_URL ?? "http://localhost:34566";
  const awsDynamodbAccessKeyId =
    process.env.AWS_DYNAMODB_ACCESS_KEY_ID ?? "dummy";
  const awsDynamodbSecretAccessKey =
    process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY ?? "dummy";

  const journalTableName =
    process.env.PERSISTENCE_JOURNAL_TABLE_NAME ?? "journal";
  const snapshotTableName =
    process.env.PERSISTENCE_SNAPSHOT_TABLE_NAME ?? "snapshot";
  const journalAidIndexName =
    process.env.PERSISTENCE_JOURNAL_AID_INDEX_NAME ?? "journal-aid-index";
  const snapshotAidIndexName =
    process.env.PERSISTENCE_SNAPSHOT_AID_INDEX_NAME ?? "snapshot-aid-index";
  const shardCount = parseInt(process.env.PERSISTENCE_SHARD_COUNT ?? "32");

  logger.info("Starting write API server");
  logger.info(`API_HOST: ${apiHost}`);
  logger.info(`API_PORT: ${apiPort}`);
  logger.info(`PERSISTENCE_JOURNAL_TABLE_NAME: ${journalTableName}`);
  logger.info(`PERSISTENCE_SNAPSHOT_TABLE_NAME: ${snapshotTableName}`);
  logger.info(`PERSISTENCE_JOURNAL_AID_INDEX_NAME: ${journalAidIndexName}`);
  logger.info(`PERSISTENCE_SNAPSHOT_AID_INDEX_NAME: ${snapshotAidIndexName}`);
  logger.info(`PERSISTENCE_SHARD_COUNT: ${shardCount}`);
  logger.info(`AWS_REGION: ${awsRegion}`);
  logger.info(`AWS_DYNAMODB_ENDPOINT_URL: ${awsDynamodbEndpointUrl}`);
  logger.info(`AWS_DYNAMODB_ACCESS_KEY_ID: ${awsDynamodbAccessKeyId}`);
  logger.info(`AWS_DYNAMODB_SECRET_ACCESS_KEY: ${awsDynamodbSecretAccessKey}`);

  let dynamodbClient: DynamoDBClient;
  if (
    awsRegion &&
    awsDynamodbEndpointUrl &&
    awsDynamodbAccessKeyId &&
    awsDynamodbSecretAccessKey
  ) {
    dynamodbClient = new DynamoDBClient({
      region: awsRegion,
      endpoint: awsDynamodbEndpointUrl,
      credentials: {
        accessKeyId: awsDynamodbAccessKeyId,
        secretAccessKey: awsDynamodbSecretAccessKey,
      },
    });
  } else {
    dynamodbClient = new DynamoDBClient();
  }

  const eventStore = EventStoreFactory.ofDynamoDB<
    GroupChatId,
    GroupChat,
    GroupChatEvent
  >(
    dynamodbClient,
    journalTableName,
    snapshotTableName,
    journalAidIndexName,
    snapshotAidIndexName,
    shardCount,
    convertJSONToGroupChatEvent,
    convertJSONToGroupChat,
  );
  const groupChatRepository =
    GroupChatRepositoryImpl.of(eventStore).withRetention(100);
  const groupChatCommandProcessor =
    GroupChatCommandProcessor.of(groupChatRepository);

  const schema = await createCommandSchema();
  const server = new ApolloServer<CommandContext>({ schema });
  const { url } = await startStandaloneServer(server, {
    context: async (): Promise<CommandContext> => ({
      groupChatCommandProcessor,
    }),
    listen: { host: apiHost, port: apiPort },
  });
  logger.info(`🚀 Server ready at ${url}`);
}

export { writeApiMain };
