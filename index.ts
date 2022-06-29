import { DocumentNode } from 'graphql'
import { Client } from 'urql'

export const createUrqlRequester =
  (client: Client) =>
  async <Context, Result, Variables extends Record<string, unknown>>(
    document: DocumentNode,
    parameters?: Variables,
    context?: Context
  ): Promise<Result> => {
    let op = client.query

    if (document.kind === 'Document') {
      for (const def of document.definitions) {
        if (def.kind === 'OperationDefinition' && def.operation === 'mutation')
          op = client.mutation
      }
    }

    return op(document, parameters, context)
      .toPromise()
      .then(data => {
        if (data.error) return Promise.reject(data.error)

        return data.data as Result
      })
  }
