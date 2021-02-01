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

      _document.on('mousenter', '.js-sidebar-nav a', function() {
        let $link = _this.data.menu.addClass('.is-active');
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
