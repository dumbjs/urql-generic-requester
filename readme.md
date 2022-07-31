# urql-generic-requester

> GraphQL Codegen Generic SDK Requester for URQL

## Features

- 0 Deps
- unminified `dist` (easier to contribute to and fix while using)

## Shortcomings

- Doesn't support `subscriptions` (yet)

I don't know of any other shortcomings, feel free to raise an issue if you do.

## About

This package is to work with
[graphql-code-generator](https://www.graphql-code-generator.com/)'s generic sdk
configuration which generates the sdk with a dynamic requester in place. Apollo
supports it directly and so does other graphql solutions. This one is for
`urql/core`

```yaml
generates:
  sdk.ts:
    plugins:
      - typescript
      - typescript-generic-sdk
```

## Install

The package depends on `graphql` and `urql`, so do install them. Ignore if
you've already have them installed.

```sh
npm i urql-generic-requester graphql urql
# or
yarn add urql-generic-requester graphql urql
```

## Usage

The library is typesafe and will infer types from urql's response structure for
you to use as is.

```js
import { createUrqlRequester } from "urql-generic-requester";
import { createClient } from "urql";

// get the sdk from the generated file from graphql-codegen
import { getSdk } from "./sdk.ts";

const client = createClient({
  // ... urql client config and exchanges
});

const requestHandler = createUrqlRequester(client);

const sdk = getSdk(requestHandler);
```

## License

[MIT](/LICENSE)
