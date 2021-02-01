//////////
// SCROLLREVEAL
//////////
(function($, APP) {
  APP.Plugins.ScrollReveal = {
    init: function(fromPjax) {
      // REVEAL animations
      let $reveals = $('[js-reveal]');

      if ($reveals.length === 0) return;

      let animatedClass = 'is-animated';
      let pageTransitionTimeout = 500;

      $('[js-reveal]').each(function(i, el) {
        let type = $(el).data('type') || 'enterViewport';

        // onload type
        if (type === 'onload') {
          let interval = setInterval(function() {
            // if (!preloaderActive){
            if (fromPjax) {
              // wait till transition overlay is fullyanimated
              setTimeout(function() {
                $(el).addClass(animatedClass);
                clearInterval(interval);
              }, pageTransitionTimeout);
            } else {
              $(el).addClass(animatedClass);
              clearInterval(interval);
            }
            // }
          }, 100);
          return;
        }

        // halfy enter
        if (type === 'halflyEnterViewport') {
          let scrollListener = throttle(function() {
            let vScrollBottom = _window.scrollTop() + _window.height();
            let elTop = $(el).offset().top;
            let triggerPoint = elTop + $(el).height() / 2;

            if (vScrollBottom > triggerPoint) {
              $(el).addClass(animatedClass);
              window.removeEventListener('scroll', scrollListener, false); // clear debounce func
            }
          }, 100);

          window.addEventListener('scroll', scrollListener, false);
          return;
        }

        // regular (default) type
        let elWatcher = scrollMonitor.create($(el));
        elWatcher.enterViewport(
          throttle(
            function() {
              $(el).addClass(animatedClass);
            },
            100,
            {
              leading: true,
            }
          )
        );
      });
    },
  };
})(jQuery, window.APP);
