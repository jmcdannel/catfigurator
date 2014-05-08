define(['backbone'], function(Backbone) {
  
  return Backbone.View.extend({

    el: '#color-controls',

    template: app.templates['ColorControls'],

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    events : {
      'change :radio' : 'color_change'
    },

    render: function() {
      app.log('render', this.model.attributes, this.model.toJSON(), this.model.get('parts'));
      var html = this.template(this.model.attributes);
      this.$el.html(html);

    },

    color_change: function(e) {

      var $selected = $(e.currentTarget);
      this.model.setColor({part: $selected.attr('name'), color: $selected.val() });

      var href = this.model.getHref();
      Backbone.history.navigate(href, true);

    }

  });

});