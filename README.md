GoStack
=======

GoStack is a JavaScript library that enables you to use asynchronous ``try-catch`` statements.

Go ahead and grab a copy of [``gostack.min.js``](https://raw.githubusercontent.com/bartjoyce/GoStack/master/bin/gostack.min.js) and try it out!

###Usage:
```javascript
// Using the new ECMAScript 6 block-level function declarations
go({
  function Try() {
    setTimeout(function() {
      throw "Oh no! An asynchronous exception!";
    }, 500);
  },
  function Catch(e) {
    alert(e);
  }
});

// More compatible version:
go({
  Try: function() {
    setTimeout(function() {
      throw "Oh no! An asynchronous exception!";
    }, 500);
  },
  Catch: function(e) {
    alert(e);
  }
});

// More compact, less intuitive version:
go(function() {
  setTimeout(function() {
    throw "Oh no! An asynchronous exception!";
  }, 500);
}, function(e) {
  alert(e);
});
```

###Dependencies (to compile source):
- Node.js
- Google Closure Compiler
- JVM version 1.7 or later (for the Google Closure Compiler)

###Making async functions work with GoStack:
To make a function, say ``setTimeout()`` work with GoStack, you have to *prep* the function. Prepping a function is very simple:
```javascript
setTimeout = go.prep(setTimeout);
```
What ``go.prep()`` does is *decorate* arguments. When you call ``setTimeout()`` it will decorate the callback you handed using ``go.decorate()``. Another way of making ``setTimeout()`` work with GoStack is by writing this:
```javascript
var original = setTimeout;
setTimeout = function(callback, interval) {
  callback = go.decorate(callback);
  return original(callback, interval);
}
```
When, after a timeout, ``callback()`` is finally called exceptions that are thrown are catched by GoStack. GoStack will be able to know which catch function to call in order to handle the exception.

###To-do list:
- [X] Add support for ``setTimeout`` and ``setInterval``
- [X] Add support for DOM events
- [ ] Add support for ``XMLHttpRequest``
