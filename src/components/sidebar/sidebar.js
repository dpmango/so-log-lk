//////////
// Sidebar
//////////
(function($, APP) {
  APP.Components.Sidebar = {
    data: {
      nav: undefined,
      menu: undefined,
    },
    init: function(fromPjax) {
      if (!fromPjax) {
        this.onMount();
        this.clickListeners();
      }
    },
    onMount: function() {
      let $nav = $('.js-sidebar-nav');
      let $menu = $('.js-sidebar-menu');

      this.data.nav = $nav;
      this.data.menu = $menu;
    },
    clickListeners: function() {
      let _this = this;

      // show menu when hovered any nav's
      // add hovered class
      // light up menu by index
      _document
        .on('mouseenter', '.js-sidebar-nav a', function() {
          let $link = $(this);
          let $menu = _this.data.menu;
          let dataIndex = $link.parent().data('index');
          // console.log({ dataIndex: dataIndex });

          $link.addClass('is-active');
          $menu.addClass('is-active');

          // light up menu by index
          $menu.find('li').removeClass('is-active');
          $menu.find('li[data-index="' + dataIndex + '"]').addClass('is-active');
        })

        .on('mouseenter', '.js-sidebar-menu a', function() {
          let $link = $(this);
          let $nav = _this.data.nav;
          let $menu = _this.data.menu;
          let dataIndex = $link.parent().data('index');

          $link.addClass('is-active');

          // light up menu by index (reverse)
          $menu.find('li').removeClass('is-active');
          $nav.find('li').removeClass('is-active');
          $nav.find('li[data-index="' + dataIndex + '"]').addClass('is-active');
        })

        .on('mouseleave', '.sidebar-global-container', function() {
          _this.data.menu.removeClass('is-active');
          _this.data.nav.find('li').removeClass('is-active');
          _this.data.nav.find('li').removeClass('is-active');
        });
    },
    // listenScroll: function() {
    //   _window.on('scroll', debounce(this.scrollHeaderDebouce.bind(this), 1250, { trailing: true }));
    // },
    // listenResize: function() {
    //   _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    // },
  };
})(jQuery, window.APP);
