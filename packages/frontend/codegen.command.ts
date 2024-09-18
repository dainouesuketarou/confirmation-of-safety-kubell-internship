import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/command.schema.graphql',
  documents: ['src/**/*.command.ts'],
  generates: {
    './src/__generated__/command/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        strictScalars: true,
        scalars: {
          DateTimeISO: 'string',
        },
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;