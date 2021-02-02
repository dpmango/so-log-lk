//////////
// Tabs
//////////
(function ($, APP) {
  APP.Plugins.Tabs = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
      this.checkHash();
    },
    changeActiveTab: function (dataHref) {
      let $link = $('.js-tabs-nav a[href="#' + dataHref + '"]');
      if ($link.length === 0) return;
      let $container = $link.closest('.js-tabs');
      let $li = $link.closest('li');

      // li active
      $li.addClass('is-active');
      $li.siblings().removeClass('is-active');

      // change active tab
      let $tab = $container.find('.js-tab[data-tab="' + dataHref + '"]');
      let $tabs = $container.find('.js-tab:not([data-tab="' + dataHref + '"])');

      $tabs.hide();
      $tab.fadeIn(250, function () {
        $tab.addClass('is-active');
      });
    },
    eventListeners: function () {
      var _this = this;
      _document.on('click', '.js-tabs-nav a', function () {
        let $link = $(this);
        let dataHref = $link.attr('href').slice(1, $link.attr('href').length);

        _this.changeActiveTab(dataHref);
      });
    },
    checkHash: function () {
      let hash = window.location.hash;
      if (hash.length === 0) return;

      this.changeActiveTab(hash.slice(1, hash.length));
    },
  };
})(jQuery, window.APP);
