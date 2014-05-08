define([
  'models/ColorControls',
  'views/ColorControls'
], function(_model, _view, ColorUtils) {

  var deferred = new $.Deferred(), model, view;

  function init(boatConfig) {

    var model = new _model({'parts': boatConfig});
    var view = new _view({ model: model });
    view.render();
  }

  return { init: init };

});