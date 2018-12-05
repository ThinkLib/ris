# RIS
React Integrated Solution. Inspired by [create-react-app](https://github.com/facebook/create-react-app)

## Quick Start

```bash
npx create-ris ris-app
cd ris-app
npm start
```
> (npx comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))

## Features
- ✔︎ **Out of the box**, with empty application and standard application which built-in react, react-router, etc.
- ✔︎ **High scalability**, can highly customize your application and build configuration.
- ✔︎ **Ultimate development experience**, with dll to speed up build process, with tools to add component, pages quickly.
- ✔︎ **High performance**, code-splitting our app with [react-loadable](https://github.com/jamiebuilds/react-loadable).
- ✔︎ **Predictable state management**,built-in [xredux](https://github.com/beyondxgb/xredux) which well handle data flow problem.
- ✔︎ **Powerful data mock**, mock data in development conveniently.

## Getting Started

You’ll need to have **Node 8.9.0** or later on your local development machine. You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to easily switch Node versions between different projects.

You can init a application as following ways:

### npx
```bash
npx create-ris <appName>
```
> (npx comes with npm 5.2+ and higher, see [instructions for older npm versions](https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f))

### npm
```bash
npm init ris <appName>
```
> `npm init` <initializer> is available in npm 6+

### yarn
```bash
yarn create ris <appName> 
```
> `yarn create` is available in Yarn 0.25+

Inside the application, you can run following scripts:

### `npm start`

### `npm run add`

### `npm run build`

## LICENSE
MIT