import { generate } from '@graphql-codegen/cli'
import { join } from 'path'

let testCtx: {
  sdkPath?: string
} = {}

async function generateSDK() {
  const basePath = join(__dirname, 'resources')
  const tempPath = join(basePath, '.generated')
  const generatedFiles = await generate(
    {
      schema: 'https://api.mocki.io/v2/c4d7a195/graphql',
      documents: basePath + '/**/*.gql',
      generates: {
        [join(tempPath, 'sdk.ts')]: {
          plugins: ['typescript', 'typescript-generic-sdk'],
        },
      },
    },
    true
  )

  if (generatedFiles.length == 0) throw new Error('Failed to introspect')

  testCtx.sdkPath = generatedFiles[0].file

  return
}

generateSDK()
