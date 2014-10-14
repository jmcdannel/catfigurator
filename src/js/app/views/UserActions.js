define(['backbone', 'utils/UrlUtils'], function(Backbone, UrlUtils) {
  
  return Backbone.View.extend({

    el: '#actions',

    template: app.templates['UserActions'],

    events: {
      'click #btn-save' : 'save_click',
      'click #close-save-link' : 'close_save_click',
      'click .input-save-link' : 'input_focus'
    },

    render: function() {

      var html = this.template(this.model.toJSON());
      this.$el.html(html);

    },

    save_click: function(e) {
      e.preventDefault();
      var $button = $(e.currentTarget);
      var $target = $('#' + $button.data('target'));
      app.log('save_click');
      if ($button.is('.open')) {
        this.close($button, $target);       
      } else {
        this.open($button, $target);
      }
    },

    close_save_click: function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget).parents('.action-window');
      var $button = $('.action-buttons [data-target=' + $target.attr('id') + ']');
      this.close($button, $target);
    },

    input_focus: function(e) {
      $(e.currentTarget).select();
      return false;
    },

    open: function($button, $target) {
      $target.addClass('open loading');
      $button.addClass('open'); 
      app.log('open',  UrlUtils.get);
      UrlUtils.get({}, this.showUrl);
    },

    close: function($button, $target) {
      $target.removeClass('open loading');
      $button.removeClass('open'); 
      $('.input-save-link').val('');    
    },

    showUrl: function(url) {
      $('.save-link.action-window').removeClass('loading');
      $('.input-save-link', this.el).val(url);
    }

  });

});