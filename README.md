## Table of Contents
- [Installation and Running](#installation-and-running)
- [Concepts and Patterns](#concepts-and-patterns)
- [What the App Does](#what-the-app-does)
- [Recommended Learning Resources](#recommended-learning-resources)
- [Soure Maps and Chrome Workspaces](#soure-maps-and-chrome-workspaces)
- [To Do](#to-do)

## Installation and Running
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See their page for information on how to perform common tasks including installation and running instructions. You can find the most recent version of their user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Quick start
1. `npm install`
2. `npm start`

### Scripts
We support the standard [Create React App scripts](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts) as well as the additional ones shown below.

### `npm run pretty`
Will use [Prettier](https://github.com/prettier/prettier) to reformat code to standard format used by this repo. **Note that you will want to [configure your editor to use prettier](https://github.com/prettier/prettier#editor-integration)**.

## Concepts and Patterns
This is a boostrap that current demonstrates the concepts below. More details on these concepts coming soon.
- [Recommended State Access Pattern - Selectors](#recommended-state-access-pattern---selectors)
- [Recommended Folder Structure](#recommended-folder-structure)
- [Recommened Async Pattern](#recommened-async-pattern)
  - includes busy indicator
  - includes support for stubbing sever responses (success and error) so that it's easy to build out features ahead of API code on the server
- Forms with [Redux Forms](https://redux-form.com/)
- Recommended auth (haven't done authz yet)
  - includes restriced routes and redirect flow
- [React Router 4](https://reacttraining.com/react-router/)
  - React Router Redux Integration (The React Router folks recommend against this but we recommend this for better testing and debugging)
- [Testing Approaches](#testing-approaches)

### Recommended State Access Pattern - Selectors
We recommend **only accessing state from selectors** and not directly in components. 

**Good**
```javascript
const mapStateToProps = state => ({
  userContext: getUserContext(state),
  isAuthenticated: isAuthenticated(state)
});
```

**Bad**
```javascript
const mapStateToProps = state => ({
  userContext: state.userContext,
  isAuthenticated: !_.isEmpty(state.userContext)
});
```

The benifits include: 
- decoupling state structure from components
  - this greatly improves your ability to refacotor you state atom shape and improve it over time by incorporating patterns like [normalization](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html).
- by also following [Recommended Folder Structure](#recommended-folder-structure) we collocate the state shape with the module that owns that state and the associated reducers. 

While deviating slightly, this recommenation also aligns well with both the [redux documentation](http://redux.js.org/docs/recipes/ComputingDerivedData.html) and the creator of Redux, Dan Abromov's, [Idiomatic Redux course on EggHead](https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers). **Note that using [Reselect](https://github.com/reactjs/reselect) is an optomization and not essentail to the recommended approach.**

### Recommended Folder Structure
We are following an approach here heavily inspired by [Jack Hsu's recommended approach](https://jaysoo.ca/2016/02/28/organizing-redux-application/).

The basic idea is to treat each feature of the application like it's own node module with an `index.js` file that defines it's public interface. Each module could implement the standard interface shown below.

```javascript
// foo/index.js
import * as actions from './foo.actions';
import * as components from './components';
import * as constants from './foo.constants';
import reducer from './foo.reducer';
import * as selectors from './foo.selectors';

export default { actions, components, constants, reducer, selectors };
```

Some key difference to what Jack recommends are below.
1. We are naming files `<featureName>.<componentType>.js` instead of `<componentType>.js`. Example `foo.actions.js` instead of `actions.js`. We are doing this because it makes searching the code base for files easier.
2. We are following [Container\Presentational pattern](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) and we are naming our container components `<FeatureName>Container.js`. Example `FooContainer.js`. However, in our `foo/components/index.js` file we are exporting the container components without the `Container` suffix as this is an internal implementation detail of the feature and we don't want all our markup to have `<FooContainer/>` and `<BarContainer/>` as most components will be containers and it will create noise in our [DSL](https://en.wikipedia.org/wiki/Domain-specific_language). 

#### Top Down Organization
```
- src // all JS app code including tests, note node_modules is not under here
--modules // contains each feature module of the application, some have UI components and some don't
--screens // contains each of the screens in the app
```

### Recommened Async Pattern
We are following the recommendation that is straight out the [redux documentation here](http://redux.js.org/docs/advanced/AsyncActions.html) where we create "tripples" of actions for each asynchrounous action creator as shown below.

```javascript
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

There is one exception. We are also following [Flux Standard Actions](https://github.com/acdlite/flux-standard-action) pattern and so have payload instead of response as shown below.

```
{ type: 'FETCH_POSTS_SUCCESS', payload: { ... } }
```

## Testing Approaches
This section is still being worked but below are some helpful links for setting up debugging of tests

- http://facebook.github.io/jest/docs/en/troubleshooting.html
- https://github.com/airbnb/enzyme
- http://facebook.github.io/jest/docs/en/troubleshooting.html

## What the App Does
- It has a few routes that you can navigate two
- If you try and go to the "Protected" route and you haven't logged in you will be redirected to the Sign In page
- After signing in you will be redirected back to the "Protected" page
- If you enter an invalid password or an invalid user name, you will be shown an error panel. When navigating away from the sign in page the error pane will automatically be closed.
- When you make an asynchronous call to the server by signing in, there will be a busy indicator shown automatically while the data is being fetched.

## Recommended Learning Resources
If you are new to react or redux and want to get up to speed then we recommend these resources.
1. Learn React and Flux basics: https://www.pluralsight.com/courses/react-flux-building-applications
2. Learn Redux and ES6 basics: https://www.pluralsight.com/courses/react-redux-react-router-es6
3. Learn Advanced Redux: https://egghead.io/courses/building-react-applications-with-idiomatic-redux

## Soure Maps and Chrome Workspaces
See this thread if you wan to get source maps working with chrome workspaces feature: https://github.com/webpack/webpack/issues/6400

## To Do
- Provide proptype warnings
