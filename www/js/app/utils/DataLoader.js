define(['lodash', 'utils/ColorUtils'], function(_, ColorUtils) {

  var colorUrl = 'data/colors.json';
  var partUrl = 'data/parts.json';
  var defaultConfig = 'data/default-config.json';

  function fetch(colors, success) {

    if (colors) {
      $.when( 
        $.get(colorUrl), 
        $.get(partUrl)
      ).then(
        function(colorResponse, partResponse) {
          parse(colorResponse, partResponse, [ColorUtils.parseUrlColors(colors)], success);
        }
      );
    } else {
      $.when( 
        $.get(colorUrl), 
        $.get(partUrl), 
        $.get(defaultConfig)
      ).then(
        function(colorResponse, partResponse, configResponse) {
          parse(colorResponse, partResponse, configResponse, success);
        }
      );
    }
  }

  function parse(colorResponse, partResponse, configResponse, success) {
    var parts = partResponse[0];
    _.each(parts, function(part) {
      part.colorList = colorResponse[0][part.colors];
      part.selected = _.find(configResponse[0], {part: part.id});
    });
    app.log('parse', parts);
    if (_.isFunction(success)) {
      success(parts);
    }
  }

  return { fetch: fetch }

});