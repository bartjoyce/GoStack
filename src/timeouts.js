/**
 * timeouts.js implements:
 * setTimeout (function)
 * setInterval (function)
 */
(function() {

  window['setTimeout'] = go.prep(window['setTimeout']);
  window['setInterval'] = go.prep(window['setInterval']);

})();
