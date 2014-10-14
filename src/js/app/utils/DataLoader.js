define(['lodash', 'utils/ColorUtils'], function(_, ColorUtils) {

  var colorUrl      = 'data/colors.json';
  var partUrl       = 'data/parts.json';
  var defaultConfig = 'data/default-config.json';

  function fetch(colors, success) {
    app.log('DataLoader.fetch', colors);
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
    var colors = colorResponse[0];
    var parts = partResponse[0].parts;
    var config = configResponse[0];
    var appData = {
      parts: parts,
      colors: colors.colors
    }
    app.log('DataLoader.parse', colorResponse);
    _.each(appData.parts, function(part) {
      part.colorList = colorResponse[0][part.colors];
      part.selected = getColor(config, part, colors.colors);
      app.log('parse part', part);
    });
    if (_.isFunction(success)) {
      success(appData);
    }
  }

  function getColor(config, part, colors) {
    var selected = _.find(config, { part: part.id });
    var color = _.find(colors, { name: selected.color });
      app.log('CU.getColor', part, colors, selected, color);
    return color;
  }

  return { fetch: fetch }

});
