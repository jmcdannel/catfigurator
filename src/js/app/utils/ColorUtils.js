define(['app'], function() {

  function parseUrlColors(urlColors) {
    var colorArr = urlColors.split(',');
    var colorObj = [];
    var colorDefinition;
    app.log('parseUrlColors');
    _.each(colorArr, function(part) {
      colorDefinition = part.split(':');
      colorObj.push({'part' : colorDefinition[0], 'color' : colorDefinition[1] });
    });
    return colorObj;
  }

  function getUrlColors(parts) {
    app.log('getUrlColors', parts);
    var colorSettings = [];
    _.each(parts, function(part) {

    app.log('getUrlColor', part);
      colorSettings.push(String.format('{0}:{1}', part.id, part.selected.name));
    });
    return colorSettings.join(',');
  }

  function getFullList(colorArr, allColors) {
    var colors = [];
    _.each(colorArr, function(colorName) {
      colors.push(_.find(allColors, { name: colorName }));
    });
    return colors;
  }

  return {
    parseUrlColors : parseUrlColors,
    getUrlColors : getUrlColors,
    getFullList : getFullList
  }

});
