(function ($, APP) {
  APP.Dev.Breakpoint = {
    setBreakpoint: function () {
      let wHost = window.location.host.toLowerCase();
      let displayCondition =
        wHost.indexOf('localhost') >= 0 ||
        wHost.indexOf('surge') >= 0 ||
        wHost.indexOf('30') >= 0 ||
        wHost.indexOf('netlify') >= 0;

      if (displayCondition) {
        let wWidth = window.innerWidth;
        let wHeight = _window.height();

        let content = "<div class='dev-bp-debug'>" + wWidth + ' x ' + wHeight + '</div>';

        $('.page').append(content);
        setTimeout(function () {
          $('.dev-bp-debug').fadeOut();
        }, 1000);
        setTimeout(function () {
          $('.dev-bp-debug').remove();
        }, 1500);
      }
    },
    listenResize: function () {
      $(window).on('resize', debounce(this.setBreakpoint, 200));
    },
  };
})(jQuery, window.APP);
