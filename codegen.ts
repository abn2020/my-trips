import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema:
    'https://api-ca-central-1.hygraph.com/v2/cl97c91gq0ei501ue1ez49pro/master',
  documents: 'src/graphql/queries.ts',
  generates: {
    'src/gql': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
