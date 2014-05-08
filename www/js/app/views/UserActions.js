define(['backbone'], function(Backbone) {
  
  return Backbone.View.extend({

    el: '#actions',

    template: app.templates['UserActions'],

    render: function() {

      var html = this.template(this.model.toJSON());
      this.$el.html(html);

    }

  });

});