define(['backbone'], function(Backbone) {

  return Backbone.Model.extend({
  	initialize: function() {

      var layers = _.sortBy(this.get('parts'), 'stack-order');
      this.set('layers', layers);

  	}
  });

});
