//////////
// Tabs
//////////
(function ($, APP) {
  APP.Plugins.Tabs = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.eventListeners();
      }
      this.checkHighlighters();
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
      const _this = this;
      _document
        .on('click', '.js-tabs-nav a', function () {
          let $link = $(this);
          let dataHref = $link.attr('href').slice(1, $link.attr('href').length);

          _this.changeActiveTab(dataHref);
        })
        .on('mouseenter', '.js-tabs-nav a', function () {
          let $link = $(this);
          let $highlighter = $('.js-nav-highlighter');

          _this.setHighlighterPosition($link, $highlighter);
        })
        .on('mouseleave', '.js-tabs-nav', function () {
          let $container = $(this);
          let $link = $container.find('li.is-active a');
          let $highlighter = $container.find('.js-nav-highlighter');

          _this.setHighlighterPosition($link, $highlighter);
        });
    },
    checkHash: function () {
      let hash = window.location.hash;
      if (hash.length === 0) return;

      this.changeActiveTab(hash.slice(1, hash.length));
    },
    checkHighlighters: function () {
      const _this = this;
      let $highlighters = $('.js-nav-highlighter');
      if ($highlighters.length === 0) return;

      $highlighters.each(function (i, el) {
        let $highlighter = $(el);
        let $link = $highlighter.parent().find('li.is-active a');

        _this.setHighlighterPosition($link, $highlighter);
      });
    },
    setHighlighterPosition: function ($link, $highlighter) {
      let elWidth = $link.width();
      let elLeft = $link.position().left;

      $highlighter.css({
        width: elWidth,
        left: elLeft + 5,
      });
    },
  };
})(jQuery, window.APP);
