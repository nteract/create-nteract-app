# create-nteract-app

[![CircleCI](https://circleci.com/gh/nteract/create-nteract-app/tree/master.svg?style=svg)](https://circleci.com/gh/nteract/create-nteract-app/tree/master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> Create an nteractive application backed by next.js, mybinder and react with zero configuration.

## Installation

Install `create-nteract-app` globally

```bash
npm i -g create-nteract-app
```

## Getting Started

Create an nteract app and run the development server.

```bash
create-nteract-app myApp
cd myApp
yarn dev
```

![cna](https://user-images.githubusercontent.com/15242567/45272888-dd35c380-b47d-11e8-9590-b556baf04783.gif)

Now, navigate to [http://localhost:3000/](http://localhost:3000/) and you should see the following:

![image](https://user-images.githubusercontent.com/15242567/45272197-d1e09900-b479-11e8-8788-062b8659182b.png)

## Batteries included :battery:

An app bootstrapped with `create-nteract-app` comes with:

- [@nteract](https://github.com/nteract) components for interactive computing apps/pages
- automatic webpack and babel configuration through [next.js](https://nextjs.org/)
- live hot reloading
- [mdx](https://mdxjs.com/)
- every .js or .md file in `./pages` becomes a route that gets automatically processed and rendered!

This means you can write your app in `js`, `markdown` or even both! :smile:

Your new nteract app will have the following strucure,

```bash
.
├── __tests__
│   └── index-spec.js
├── components
│   ├── code-state.js
│   └── presentation-cell.js
├── next.config.js
├── package.json
├── pages
│   ├── _document.js
│   └── index.js
├── scripts
│   └── test-setup.js
└── yarn.lock
```

## Commands :robot:

1. `yarn dev`

   This will start the next.js server on port `3000` by default. Note, to change the port, run `yarn dev -p YOUR_PORT`

2. `yarn test`

   This will kick off the [Jest](https://jestjs.io/) test suite. By default, we have included a snapshot test.

3. `yarn build`

   This will produce an optimize set of code for production.

4. `yarn start`

   This will run your optimized app on port 3000.

5. `yarn export`

   This will export your code as a static HTML app.

## Contributing :tada:

Thanks for your interest in contributing! If you get stuck at any point, don't hesitate to reach out to the nteract team on slack or through the issue tracker.

To get started hacking on `create-nteract-app`, clone the repo and install dependencies.

```bash
git clone https://github.com/nteract/create-nteract-app.git
cd create-nteract-app
yarn
```

Now, make your changes and try them out with,
`yarn dev your-test-app`

This will run `create-nteract-app` with any modifications you have made. Test your changes with `yarn test`.

See [CONTRIBUTING.md](https://github.com/nteract/create-nteract-app/blob/master/CONTRIBUTING.md) for more details.
