/**
 * DOM.js implements:
 * Element.addEventListener()
 */
(function() {

  // Store original functions
  var addEventListener = Element.prototype.addEventListener;
  var removeEventListener = Element.prototype.removeEventListener;

  var decorateAndCache = function decorateAndCache(callback) {
    return (callback.__decorated__ = go.decorate(callback));
  }

  Element.prototype.addEventListener = function(event, callback, capture) {
    callback = decorateAndCache(callback);

    return addEventListener.call(this, event, callback, capture);
  }

  Element.prototype.removeEventListener = function(event, callback, capture) {
    callback = callback.__decorated__ || callback;

    return removeEventListener.call(this, event, callback, capture);
  }

})();
