define(['handlebars', 'lodash' ], function(Handlebars, _) {


  Handlebars.registerHelper('compare', function(v1, op, v2, options) {
    var c = {
      'eq': function(v1, v2) {
          return v1 == v2;
      },
      'neq': function(v1, v2) {
          return v1 != v2;
      },
      'doesntstartwith':function(v1, v2){
          return v1.substring(0, v2.length) != v2;
      },
      'startswith':function(v1, v2){
          return v1.substring(0, v2.length) == v2;
      }
    }

    if (Object.prototype.hasOwnProperty.call(c, op)) {
      return c[op].call(this, v1, v2) ? options.fn(this) : options.inverse(this);
    }
    return options.inverse(this);
  });

  Handlebars.registerHelper('getColor', function(name, colors) {

    app.log('getColor', name, colors, _.find(colors, {name: name}).description);
    return _.find(colors, {name: name}).description;

  });

});