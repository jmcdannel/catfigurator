define(['backbone'], function(Backbone) {
  
  return Backbone.View.extend({

    el: '#app-title',

    template: app.templates['Title'],

    render: function() {

      var html = this.template(this.model.toJSON());
      this.$el.html(html);

    }

  });

});