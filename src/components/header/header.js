//////////
// HEADER
//////////
(function($, APP) {
  APP.Components.Header = {
    data: {
      classes: {
        fixedClass: 'is-fixed',
        visibleClass: 'is-fixed-visible',
        bodyFixedVisible: 'is-header-fixed-visible',
      },
      header: {
        container: undefined,
        bottomPoint: undefined,
      },
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        // this.getHeaderParams();
        // this.hamburgerClickListener();
        // this.listenScroll();
        // this.listenResize();
      }
    },
    getHeaderParams: function() {
      let $header = $('.header');
      let headerOffsetTop = 0;
      let headerHeight = $header.outerHeight() + headerOffsetTop;

      this.data.header = {
        container: $header,
        bottomPoint: headerHeight,
      };
    },
    // hamburgerClickListener: function() {
    //   _document.on('click', '[js-hamburger]', function() {
    //     $(this).toggleClass('is-active');
    //     $('.mobile-navi').toggleClass('is-active');

    //     if ($(this).is('.is-active')) {
    //       APP.Plugins.ScrollBlock.disableScroll();
    //     } else {
    //       APP.Plugins.ScrollBlock.enableScroll();
    //     }
    //   });
    // },
    // listenScroll: function() {
    //   _window.on('scroll', this.scrollHeader.bind(this));
    //   _window.on('scroll', debounce(this.scrollHeaderDebouce.bind(this), 1250, { trailing: true }));
    // },
    // listenResize: function() {
    //   _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    // },
    makeHeaderVisible: function() {
      this.data.header.container.addClass(this.data.classes.visibleClass);
      $('body').addClass(this.data.classes.bodyFixedVisible);
      this.data.header.isFixedVisible = true;
    },
    makeHeaderHidden: function() {
      this.data.header.container.removeClass(this.data.classes.visibleClass);
      $('body').removeClass(this.data.classes.bodyFixedVisible);
      this.data.header.isFixedVisible = false;
    },
  };
})(jQuery, window.APP);
