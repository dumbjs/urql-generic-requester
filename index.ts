import { DocumentNode } from "graphql";
import { Client } from "urql";

export const createUrqlRequester = (client: Client) => {
  return <Context, Result, Variables extends {}>(
    document: DocumentNode,
    params?: Variables,
    context?: Context
  ): Promise<Result> => {
    let op = client.query;
    const opMeta = document;
    if (opMeta.kind === "Document") {
      opMeta.definitions.forEach((def) => {
        if (
          def.kind === "OperationDefinition" &&
          def.operation === "mutation"
        ) {
          op = client.mutation;
        }
      });
    }
    return op(document, params, context)
      .toPromise()
      .then((data) => {
        if (data.error) {
          return Promise.reject(data.error);
        }
        return data.data;
      });
  };
};
