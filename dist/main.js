'use strict';

var reactRouterRedux = require('react-router-redux');

var instanaMiddleware = function instanaMiddleware(store) {
  return function (next) {
    return function (action) {
      if (action.type === reactRouterRedux.LOCATION_CHANGE) {
        if (typeof ineum !== 'undefined') {
          ineum('page', action.payload.pathname.split('/')[1]);
        }
      }

      if (action.meta && action.meta.instana && typeof ineum !== 'undefined') {
        // for actions other than startSpaPageTransition you likely want to
        // include the time that React is using to render the virtual DOM.
        // Putting the tracking in a setTimeout makes that very likely.
        if (action.meta.instana[0] === 'startSpaPageTransition') {
          ienum.apply(null, action.meta.instana);
        } else {
          setTimeout(function () {
            ienum.apply(null, action.meta.instana);
          }, 0);
        }
      }

      next(action);
    };
  };
};

module.exports = instanaMiddleware;
