define(['backbone'], function(Backbone) {
  
  return Backbone.View.extend({

    el: '#preview',

    template: app.templates['BoatPreview'],

    render: function() {

      var html = this.template(this.model.toJSON());
      this.$el.html(html);

    }

  });

});