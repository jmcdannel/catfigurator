define([
  'models/UserActions',
  'views/UserActions'
], function(_model, _view) {

  function init() {
    var model = new _model();
    
    var view = new _view({
      model: model
    });
    view.render();
  }

  return { init: init };

});