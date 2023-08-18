import { createUrqlRequester } from '../index'
import { createClient, gql } from 'urql/core'
import { test } from 'uvu'
import * as assert from 'uvu/assert'
import { DocumentNode } from 'graphql'
import fetch from 'isomorphic-fetch'

// Helper types
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}

type Scalars = {
  String: string
}

export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>

// Document types
type User = {
  id: string
  name: string
  email: string
}

type GetUserQuery = {
  __typename?: 'Query'
  user: {
    __typename?: 'User'
    id: string
    name: string
    email: string
  }
}

type GetUserQueryVariables = Exact<{ id: Scalars['String'] }>

const GetUserDocument = gql`
  query getUser($id: String) {
    user(id: $id) {
      id
      email
      name
    }
  }
`

// SDK
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getUser(
      variables?: GetUserQueryVariables,
      options?: C
    ): Promise<GetUserQuery> {
      return requester<GetUserQuery, GetUserQueryVariables>(
        GetUserDocument,
        variables,
        options
      ) as Promise<GetUserQuery>
    },
  }
}

// Client Creation
let url = 'https://api.mocki.io/v2/c4d7a195/graphql'

const client = createClient({
  url,
  fetch: fetch,
})

const requestHandler = createUrqlRequester(client)
const sdk = getSdk(requestHandler)

test('should run query', async () => {
  console.log('running')
  try {
    const response = await sdk.getUser({
      id: 'Hello World',
    })
    assert.is(response.user.name, 'Hello World')
  } catch (err) {
    console.error(err)
  }
})

test('typecheck query', async () => {
  console.log('running')
  try {
    const response = await sdk.getUser({
      id: 'Hello World',
    })

    // @ts-expect-error invalid path completion should be `response.user`
    assert.is.not(response.data, 'Hello World')
  } catch (err) {
    console.error(err)
  }
})

test.run()
