# Full-stack App Template

[![Build Status](https://travis-ci.org/spect88/fullstack-app-template.svg)](https://travis-ci.org/spect88/fullstack-app-template)

Framework-agnostic template for Single Page Apps, backed by simple
Express server. The basic development tools are all set up.

## Features

### Backend

* [ES6][1] support (thanks to [Babel][2])
* [Jasmine][3] 2.3 specs without any need for PhantomJS
* [Express][4] app prepared to serve frontend code
* Live reload using [nodemon][5]

### Frontend

* [ES6][1] support (thanks to [Babel][2])
* [Jasmine][3] 2.3 specs without any need for PhantomJS
* [SCSS][6] using [node-sass][7]
* [Browserify][8] for dependencies and bundling
* [Bootstrap][9] for easy prototyping
* Live reload using [BrowserSync][10]

### Deplyoment / CI / Tools

* Easy deployment to [Heroku][11] (thanks to [app.json][12] schema and `postinstall` script in `package.json`)
* [Travis CI][13] config
* [projectionist.vim][14] config

[1]: https://github.com/lukehoban/es6features
[2]: http://babeljs.io/
[3]: http://jasmine.github.io/
[4]: http://expressjs.com/
[5]: http://nodemon.io/
[6]: http://sass-lang.com/
[7]: https://www.npmjs.com/package/node-sass
[8]: http://browserify.org/
[9]: http://getbootstrap.com/
[10]: http://www.browsersync.io/
[11]: https://www.heroku.com/
[12]: https://devcenter.heroku.com/articles/app-json-schema
[13]: https://travis-ci.com/
[14]: https://github.com/tpope/vim-projectionist

## Development

First get the dependencies:

```bash
$ npm install
```

then just start the auto-reloading server:

```bash
$ npm run serve
```

## Testing

```bash
$ npm test
```

## Deployment

### Heroku

Either use the
[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
button or set appropriate (see `app.json`) environment variables and push your code.

### Other

Make sure `node` and `npm` are available and execute these commands:

```bash
$ export NODE_ENV=production
$ npm install
$ npm start
```
