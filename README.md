# Helmet Prehandler

![Node.js CI](https://github.com/tuftjs/helmet-prehandler/workflows/Node.js%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/tuftjs/helmet-prehandler/badge.svg)](https://coveralls.io/github/tuftjs/helmet-prehandler)
[![Known Vulnerabilities](https://snyk.io/test/github/tuftjs/helmet-prehandler/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tuftjs/helmet-prehandler?targetFile=package.json)

Helmet Prehandler is a first-party extension for Tuft that acts as a simple wrapper for [Helmet](https://helmetjs.github.io/), the popular security middleware package for Express.

For detailed information on how Tuft *prehandlers* work, view the [official documentation](https://www.tuft.dev/docs/extensions/#pre-handlers).

## Installation
```
  $ npm install @tuft/helmet-prehandler
```

## Usage

Import the named `createHelmetPrehandler` function, and then invoke it to create a Tuft *prehandler* that can be inserted into any Tuft application.

```js
const { tuft } = require('tuft')
const { createHelmetPrehandler } = require('@tuft/helmet-prehandler')

const app = tuft({
  preHandlers: [createHelmetPrehandler()]
})
```

It accepts the same options as Helmet. By default, all **11** of Helmet's middleware functions are enabled:

* `contentSecurityPolicy`
* `dnsPrefetchControl`
* `expectCt`
* `frameguard`
* `hidePoweredBy`
* `hsts`
* `ieNoOpen`
* `noSniff`
* `permittedCrossDomainPolicies`
* `referrerPolicy`
* `xssFilter`

To disable one of them, simply set it to `false`:

```js
const app = tuft({
  preHandlers: [createHelmetPrehandler({
    contentSecurityPolicy: false
  })]
})
```

For detailed documentation on how each function works and the options that are accepted, please visit the [official Helmet website](https://helmetjs.github.io/).

## People
The creator and maintainer of Helmet Prehandler is [Stuart Kennedy](https://github.com/rav2040).

Helmet is maintained by a team of [contributors](https://helmetjs.github.io/contributors/).

## License
[MIT](https://github.com/tuftjs/helmet-prehandler/blob/master/LICENSE)
