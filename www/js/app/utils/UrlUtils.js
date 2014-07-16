define(['app'], function() {

  function getUrl(config, success) {
    app.log('get');
    setTimeout(function() {
      app.log('get done', success);
      success('http://fake.url/short');
    }, 1500);
  }

  return { get: getUrl }

});