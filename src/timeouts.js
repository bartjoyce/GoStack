/**
 * timeouts.js implements:
 * setTimeout (function)
 * setInterval (function)
 */
(function() {

  window['setTimeout'] = go.process(window['setTimeout'], 0);
  window['setInterval'] = go.process(window['setInterval'], 0);

})();
