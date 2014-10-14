define([
  'models/BoatPreview',
  'views/BoatPreview'
], function(_model, _view) {

  function init(boatConfig) {
    var model = new _model(boatConfig);
    var view = new _view({ model: model });
    view.render();
  }

  return { init: init };

});
