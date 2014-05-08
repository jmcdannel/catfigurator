define([
  'backbone',
  'lodash',
  'modules/Catfigurator',
  'modules/Title',
  'modules/BoatPreview',
  'modules/ColorControls',
  'modules/UserActions',
  'utils/DataLoader'
], function(Backbone, _, Catfigurator, Title, BoatPreview, ColorControls, UserActions, DataLoader){

  var Router = Backbone.Router.extend({

    routes: {
      '': 'default',
      ':colors': 'default'
    },

    initialize: function() {
      
    },

    default: function(colors) {
      app.log('router:default');

      DataLoader.fetch(colors, function(boatConfig) {
        app.log('fetched', boatConfig);
        Catfigurator.init();
        Title.init();
        UserActions.init();
        ColorControls.init(boatConfig);
        BoatPreview.init(boatConfig);
      });      
    }

  });

  return Router;

});