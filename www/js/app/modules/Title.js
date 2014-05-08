define([
  'models/Title',
  'views/Title'
], function(_model, _view) {

  function init() {
    app.log(_model, _view);
    
    var model = new _model();
    
    var view = new _view({
      model: model
    });
    view.render();
  }

  return { init: init };

});