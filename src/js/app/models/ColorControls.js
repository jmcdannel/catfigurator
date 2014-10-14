define(['backbone', 'utils/ColorUtils'], function(Backbone, colorUtils) {

  return Backbone.Model.extend({

    initialize: function() {

      var parts = this.get('parts');
      var colors = this.get('colors');
      _.each(parts, function(part) {
        part.colorList = colorUtils.getFullList(part.colorList, colors);
      });
      this.set('parts', parts);
      app.log('CU.init', arguments, this.get('parts'), colors);
    },

    setColor: function(newColor) {

      _.find(this.get('parts'), {'id': newColor.part} ).selected = newColor;
      this.trigger('change');

    },

    getHref: function() {
      app.log('getHref', colorUtils, this.get('parts'));
      return '/' + colorUtils.getUrlColors(this.get('parts'));
    }

  });

});
