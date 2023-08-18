import { DocumentNode } from 'graphql'
import { Client } from 'urql'

export const createUrqlRequester = <Context, E = unknown>(client: Client) => {
  return async <Result, Variables>(
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

    return op(document, parameters as Record<string, unknown>, context)
      .toPromise()
      .then(data => {
        if (data.error) return Promise.reject(data.error)

        return data.data as Result
      })
  }
}
