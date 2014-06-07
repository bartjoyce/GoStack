GoStack
=======

GoStack is a JavaScript library that enables you to use asynchronous ``try-catch`` statements.

###Usage:
```javascript
// Using the new ECMAScript 6 block-level function declarations
go({
  Try() {
    setTimeout(function() {
      throw "Oh no! An asynchronous exception!";
    }, 500);
  },
  Catch(e) {
    alert(e);
  }
});

// Backwards compatible version:
go({
  Try: function() {
    setTimeout(function() {
      throw "Oh no! An asynchronous exception!";
    }, 500);
  },
  Catch(e) {
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

###To-do list:
- Add support for DOM events
- Add support for ``XMLHttpRequest``
