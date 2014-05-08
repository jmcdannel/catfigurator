define(['router', 'utils/HandlebarHelpers'], function(Router) {
    
  function init() {

    var loggingEnabled = true;
    var app = window.app || {};

    app.log = function() {

        if (!loggingEnabled) return;

        app.log.history = app.log.history || [];   // store logs to an array for reference
        app.log.history.push(arguments);
        if(window.console){
            console.log( Array.prototype.slice.call(arguments) );
        }
    }

    window.app = app;

    String.format = function() {
        // The string containing the format items (e.g. "{0}")
        // will and always has to be the first argument.
        var theString = arguments[0];

        // start with the second argument (i = 1)
        for (var i = 1; i < arguments.length; i++) {
          // "gm" = RegEx options for Global search (more than one instance)
          // and for Multiline search
          var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
          theString = theString.replace(regEx, arguments[i]);
        }

        return theString;
      }



    var router = new Router();
    Backbone.history.start({ pushState: false, root: "/"});

  }

  init();

});