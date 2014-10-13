define(['backbone'], function(Backbone) {
  
  return Backbone.View.extend({

    el: '#catfigurator',

    template: app.templates['Catfigurator'],

    render: function() {

      var html = this.template(this.model.toJSON());
      this.$el.html(html);

    }

  });

});