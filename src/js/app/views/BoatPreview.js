define(['backbone'], function(Backbone) {

  return Backbone.View.extend({

    el: '#preview',

    template: app.templates['BoatPreview'],

    render: function() {

      var base = this;

      var html = this.template(this.model.toJSON());
      this.$el.html(html);

      $('figure', this.el).load('images/boats/legend.svg', function() {
        base.renderColors();
      });

    },

    renderColors: function() {
      var base = this;
      var parts = this.model.get('parts');
      this.$svg = $('figure > svg', this.el);
      app.log('boat svg rendered', this.$svg);
      parts.forEach(function(part) {
        base.renderColor(part);
      });

    },

    renderColor: function(part) {
      var $part = this.$svg.find('[data-part="' + part.id + '"]');
      $part.attr('data-color', part.selected.name);
    }

  });

});
