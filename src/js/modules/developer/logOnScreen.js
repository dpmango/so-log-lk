(function($, APP) {
  APP.Dev.LogOnScreen = {
    showLog: function(message) {
      let wHost = window.location.host.toLowerCase();
      let displayCondition =
        wHost.indexOf('localhost') >= 0 ||
        wHost.indexOf('surge') >= 0 ||
        wHost.indexOf('netlify') >= 0;
      if (displayCondition) {
        let content = "<div class='dev-bp-debug'>" + message + '</div>';

        $('.page').append(content);
        setTimeout(function() {
          $('.dev-bp-debug').fadeOut();
        }, 1000);
        setTimeout(function() {
          $('.dev-bp-debug').remove();
        }, 1500);
      }
    },
  };
})(jQuery, window.APP);
