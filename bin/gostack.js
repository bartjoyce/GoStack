/* This file has been based off ROM.template.js
   The template file embeds scripts by detecting
   comments with the following format:
   //> {filename} */
(function(window) {

/*** Core ***/
/**
 * core.js implements:
 * go (function)
 * go.state (function)
 * go.pushState (function)
 * go.popState (function)
 * go.decorate (function)
 * go.process (function)
 */
(function() {
  var stack = [];

  /**
   go()
   Asynchronous try-catch statement.
   */
  var go = function go() {
    var Try, Catch;

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
      if (typeof arguments[0].Try === 'function') Try = arguments[0].Try;
      if (typeof arguments[0].Catch === 'function') Catch = arguments[0].Catch;
    } else if (arguments.length === 2 && typeof arguments[0] === 'function' && typeof arguments[1] === 'function')
      Try = arguments[0], Catch = arguments[1];
    else
      throw new Exception('Invalid arguments passed to go()');

    go.pushState(Catch);

    try {
      Try();
    } catch (e) {
      go.state(e);
    }

    go.popState();
  }

  /**
   pushState()
   Pushes a new catch function on to the stack.
   */
  go.pushState = function pushState(fn) {
    if (typeof fn !== 'function')
      throw new Exception('Invalid argument passed to go.pushState()');

    stack.push(fn);
    updateState();
    return go.state;
  }

  /**
   popState()
   Pops the top catch function off of the stack.
   */
  go.popState = function popState() {
    if (stack.length === 0)
      return;

    stack.pop();
    updateState();
  }

  /**
   decorate()
   Given a callback function returns a new functions which
   saves a snapshot of the current state within it so it
   can throw exceptions asynchronously.
   */
  go.decorate = function decorate(fn) {
    if (typeof fn !== 'function')
      throw new Exception('Invalid argument passed to go.decorate()');

    var state = go.state;
    return function decorated() {
      try {
        return fn.apply(this, arguments);
      } catch (e) {
        state(e);
      }
    }
  }

  /**
   prep()
   Given a function returns a new function which, when called,
   decorates all arguments which are functions.
   */
  go.prep = function prep(fn) {
    if (typeof fn !== 'function')
      throw new Exception('Invalid arguments passed to go.prep()');

    return function prepped() {
      for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function')
          arguments[i] = go.decorate(arguments[i]);
      }

      return fn.apply(this, arguments);
    }
  }

  var updateState = function updateState() {
    var stackSnapshot = stack.slice();

    go.state = function(e) {
      for (var i = stackSnapshot.length - 1; i >= 0 && stackSnapshot[i](e) === false; i--) {}

      if (i < 0)
        throw e;
    }
  }

  updateState();

  window['go'] = go;
})();


/*** Implementations of Async functions ***/
/**
 * timeouts.js implements:
 * setTimeout (function)
 * setInterval (function)
 */
(function() {

  window['setTimeout'] = go.prep(window['setTimeout']);
  window['setInterval'] = go.prep(window['setInterval']);

})();


})(window);

