define(['backbone'], function(Backbone) {

  return Backbone.View.extend({

    el: '#color-controls',

    template: app.templates['ColorControls'],

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    events : {
      'change :radio' : 'color_change',
      'click .selected-color' : 'show_colors'
    },

    render: function() {
      app.log('ColorControls.render', this.model.attributes, this.model.toJSON(), this.model.get('parts'));
      var html = this.template(this.model.attributes);
      this.$el.html(html);

    },

    show_colors: function(e) {
      var $container = $(e.currentTarget).parent();
      if ($container.is('.active')) {
        $container.removeClass('active');
      } else {
        $('fieldset.active', this.$el).removeClass('active');
        $container.addClass('active');
      }

    },

    color_change: function(e) {
      app.log('color_change', this.model);
      var $selected = $(e.currentTarget);
      var parts = this.model.get('parts');
      var part = _.find(parts, { id: $selected.attr('name') });
      part.selected = _.find(part.colorList, { name: $selected.val() });
      app.log('cc parts', parts, part, this.model.get('parts'), $selected.attr('name'),  $selected.val());
      this.model.set('parts', parts);
      //this.model.setColor({part: $selected.attr('name'), color: color });

      var href = this.model.getHref();
      Backbone.history.navigate(href, true);

    }

  });

});
