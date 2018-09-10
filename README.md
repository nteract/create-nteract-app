# create-nteract-app

[![CircleCI](https://circleci.com/gh/nteract/create-nteract-app/tree/master.svg?style=svg)](https://circleci.com/gh/nteract/create-nteract-app/tree/master)

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

## Batteries included

An app bootstrapped with `create-nteract-app` comes with:

- @nteract components for interactive computing apps/pages
- webpack and babel configuration through next.js
- server rendering of `./pages`
- live hot reloading
- mdx
  This means you can write your app in `js` or `markdown` or even both! :smile:

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
