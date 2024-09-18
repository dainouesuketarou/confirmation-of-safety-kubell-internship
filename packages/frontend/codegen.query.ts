import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './graphql/query.schema.graphql',
  documents: ['src/**/*.query.ts'],
  generates: {
    './src/__generated__/query/': {
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