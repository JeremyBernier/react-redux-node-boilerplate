# React Redux Node Boilerplate

This is a React/Redux single page app that can be used as boilerplate for any starting project, or simply for educational purposes. 

**NOTE: This boilerplate is years old (which in the frontend world is like decades old), and at this point is outdated. Webpack, Babel, React-Router, etc. all need to be upgraded (unfortunately not as trivial as changing versions). Thus I do not recommend using this boilerplate beyond simply being a reference.

### Features:

* Universal/Isomorphic rendering
* Server-side rendering (aborts after 1 second)
* Hot reload
* Code splitting (vendor, core, and page route JS bundles)
* Versioning of build files. Filenames are uniquely generated upon build (for cache-busting)
* Meta tags updated on page transitions (via React Helmet)

#### Development

```
yarn install
npm start

open http://localhost:1337
```

#### Production

```
yarn install
npm run start:prod:clean

open http://localhost:1337
```

Production on the actual servers is run with `pm2 start process.yml` (see `Dockerfile`)

#### Code Style Guides
* https://github.com/airbnb/javascript
* https://github.com/airbnb/javascript/tree/master/react
* https://github.com/airbnb/css

##### Babel

Note: .babelrc is solely used for compiling server-side files (client-side Babel configs can be found inside webpack folder). 

#### TODO: 

- [ ] Upgrade React
- [ ] Unit Testing
- [ ] Authentication (eg. JWT, Redis)
- [ ] Clean up Ajax calls, handle errors properly
- [ ] lazy load images
- [ ] logging
- [ ] Analyze webpack bundle (webpack has native program for this)
- [ ] Caching with Service Workers, Offline Mode
- [ ] Code splitting CSS