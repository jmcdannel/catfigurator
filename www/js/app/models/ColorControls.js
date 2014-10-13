define(['backbone', 'utils/ColorUtils'], function(Backbone, colorUtils) {

  return Backbone.Model.extend({

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