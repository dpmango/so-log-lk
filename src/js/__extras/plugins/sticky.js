//////////
// STICKY KIT
//////////
(function($, APP) {
  APP.Plugins.Sticky = {
    init: function(fromPjax) {
      this.initStickyKit();
      this.initCustomSticky();
      if (!fromPjax) {
        this.listenResize();
      }
    },
    listenResize: function() {
      _window.on('resize', debounce(this.initStickyKit.bind(this), 100));
    },
    initStickyKit: function() {
      let $elements = $('.page')
        .last()
        .find('.js-sticky');

      if ($elements.length === 0) return;

      $elements.each(function(i, sticky) {
        let $sticky = $(sticky);
        let dataOffsetTop = $sticky.data('offset-top')
          ? parseInt($sticky.data('offset-top'), 10)
          : 100;
        let stopWatching = $sticky.data('stop') ? mediaCondition($sticky.data('stop')) : null;

        if (stopWatching === null || !stopWatching) {
          if (!$sticky.is('.is-sticky-attached')) {
            // console.log('attaching sticky kit');
            $sticky.stick_in_parent({
              // eslint-disable-next-line camelcase
              offset_top: dataOffsetTop,
              // eslint-disable-next-line camelcase
              // inner_scrolling: false,
            });
            $sticky.addClass('is-sticky-attached');
          }
          // $sticky.trigger('sticky_kit:recalc');
        } else {
          if ($sticky.is('.is-sticky-attached')) {
            // console.log('detaching sticky kit');
            $sticky.trigger('sticky_kit:detach');
            $sticky.removeClass('is-sticky-attached');
          }
        }
      });
    },
    initCustomSticky: function() {
      let $stickyNav = $('.page')
        .last()
        .find('.js-sticky-nav');
      if ($stickyNav.length === 0) return;

      _window.on('scroll', function() {
        // get scroll params from blocker function
        let scroll = APP.Plugins.ScrollBlock.getData();
        if (scroll.blocked) return;
        let stickyTop = $stickyNav.offset().top;
        let headerOffset = APP.Components.Header.data.header.headerHeight;

        if (scroll.y > stickyTop - headerOffset) {
          $stickyNav.addClass('is-sticky');
        } else {
          $stickyNav.removeClass('is-sticky');
        }
      });
    },
    update: function() {
      let $sticky = $('.js-sticky.is-sticky-attached');
      if ($sticky.length === 0) return;

      $sticky.trigger('sticky_kit:recalc');
      setTimeout(function() {
        $sticky.trigger('sticky_kit:recalc');
      }, 150);
    },
  };
})(jQuery, window.APP);
