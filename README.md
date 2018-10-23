# Redux Middleware for Instana

This middleware automatically reports navigation changes to Instana.

## Usage

### Navigation Tracking

Add it in your applyMiddleware funciton.

```javascript
import { createStore, applyMiddleware } from 'redux';
import instanaMiddleware from 'instana-redux-middleware';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(instanaMiddleware)
);
```

After adding the middleware navigation events will be sent to Instana.

### Custom Tracking

If `action.meta.instana` is an array, those values will be sent as arguments to instana's API.

When using actions, the middleware attempts to time the actual time used in both loading and rendering. It will run calls to `startSpaPageTransition` immediately but defer `endSpaPageTransition` calls until after reducers have run and React has had a chance to render.

```javascript
// this example uses redux-thunk
const myAction = args => dispatch => {
  dispatch({
    type: START_LOADING,
    meta: {
      instana: ['startSpaPageTransition']
    }
  });
  
  loadStuff(args).then(result => {
    dispatch({
      type: FINISH_LOADING,
      meta: {
        instana: [
          'endSpaPageTransition',
          {status: 'completed', url: window.location.href}
        ]
      }
      payload: result
    });
  }).catch(error => {
    dispatch({
      type: LOAD_ERROR,
      meta: {
        instana: [
          'endSpaPageTransition',
          {
            status: 'error',
            url: window.location.href
            explanation: error.description
          }
        ]
      },
      payload: error
    });
  })
}
```

of coures, you can still use the `ienum` global.

## Why not use their navigation component?

The navigation component they provided only reports page transition time if all the data required for rendering is already in the store. If you're loading data and showing a spinner, it measures the amount of time it takes to show the spinner.

* You can track the page transition time of your app _including_ load times for data
* It does not pollute the DOM.
* Usage is transparent and can be added or removed easily.
* Works with memory or hash based routing
