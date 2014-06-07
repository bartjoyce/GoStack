GoStack
=======

GoStack is a JavaScript library that enables you to use asynchronous ``try-catch`` statements.

Go ahead and grab a copy of [``gostack.min.js``](https://raw.githubusercontent.com/bartjoyce/GoStack/master/bin/gostack.min.js) and try it out!

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

###Dependencies:
- Node.js
- Google Closure Compiler
- JVM version 1.7 or later (for the Google Closure Compiler)

###To-do list:
- [X] Add support for ``setTimeout`` and ``setInterval``
- [ ] Add support for DOM events
- [ ] Add support for ``XMLHttpRequest``
