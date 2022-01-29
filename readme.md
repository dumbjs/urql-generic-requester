# urql-generic-requester

> GraphQL Codegen Generic SDK Requester creator for URQL Client

[![Stargazers](https://img.shields.io/github/stars/barelyhuman/urql-generic-requester?style=for-the-badge&color=98C379&labelColor=18181b)](https://github.com/barelyhuman/urql-generic-requester/stargazers)
[![Issues](https://img.shields.io/github/issues/barelyhuman/urql-generic-requester?style=for-the-badge&color=98C379&labelColor=18181b)](https://github.com/barelyhuman/urql-generic-requester/issues)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=for-the-badge&color=98C379&labelColor=18181b)](https://standardjs.com)

## About

This package is to work with [graphql-code-generator](https://www.graphql-code-generator.com/)'s generic sdk configuration which generates the sdk with a dynamic requester in place. Apollo supports it directly and so does other graphql solutions. This one is for `urql/core`

```yaml
generates:
  sdk.ts:
    plugins:
      - typescript
      - typescript-generic-sdk
```

## Install

The package depends on `graphql` and `urql`, so do install them. If you have then already installed you don't have to add them again

```sh
npm i urql-generic-requester graphql urql
# or
yarn add urql-generic-requester graphql urql
```

## Usage

The library is typesafe and will infer types from urql's response structure for you to use as is.

```js
import {createUrqlRequester} from 'urql-generic-requester'
import {createClient} from 'urql'

// get the sdk from the generated file from graphql-codegen
import {getSdk} from './sdk.ts'

const client = createClient({
	// ... urql client config and exchanges
})

const requestHandler = createUrqlRequester(client)

const sdk = getSdk(requestHandler)
```

## License

[MIT](/LICENSE)
