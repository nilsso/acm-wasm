
References:

- [Rust-Webpack-React-Sass-Template](https://github.com/zephyo/Rust-Webpack-React-Sass-Template) (base template)
- [barnes-hut-rs](https://github.com/Katsutoshii/barnes-hut-rs/tree/master/src) and
  [barnes-hut-frontend](https://github.com/Katsutoshii/barnes-hut-frontend)
- [a mod b](http://medfitnet.org/amodb.php?a=1&b=4&max=4000)
- [Numeric traits](https://stackoverflow.com/a/26811100)

# Notes

- [Arbitrary data through Wasm using Serde](https://rustwasm.github.io/docs/wasm-bindgen/reference/arbitrary-data-with-serde.html)

## How to install

```sh
yarn install
```

## How to run in debug mode

```sh
# Builds the project and opens it in a new browser tab. Auto-reloads when the project changes.
yarn start
```

## How to build in release mode

```sh
# Builds the project and places it into the `dist` folder.
yarn build
```

## How to run unit tests

```sh
# Runs tests in Firefox
yarn test -- --firefox

# Runs tests in Chrome
yarn test -- --chrome

# Runs tests in Safari
yarn test -- --safari
```

## What does each file do?

- `Cargo.toml` contains the standard Rust metadata. You put your Rust dependencies in here. You must
  change this file with your details (name, description, version, authors, categories)

- `package.json` contains the standard yarn/npm metadata. You put your JavaScript dependencies in
  here. You must change this file with your details (author, name, version)

- `webpack.config.js` contains the Webpack configuration. You shouldn't need to change this, unless
  you have very special needs.

- The `js` folder contains your JavaScript code (`index.js` is used to hook everything into Webpack,
  you don't need to change it).

- The `src` folder contains your Rust code.

- The `static` folder contains any files that you want copied as-is into the final build. It
  contains an `index.html` file which loads the `index.js` file.

- The `tests` folder contains your Rust unit tests.
