//////////
// Tabs
//////////
(function($, APP) {
  APP.Plugins.Tabs = {
    init: function(fromPjax) {
      if (!fromPjax) {
        this.clickListeners();
      }
    },
    clickListeners: function() {
      _document.on('click', '.js-tabs-nav a', function() {
        let $link = $(this);
        let $container = $link.closest('.js-tabs');
        let $li = $(this).closest('li');
        let dataHref = $link.attr('href').slice(1, $link.attr('href').length);

        let $tab = $container.find('.js-tab[data-tab="' + dataHref + '"]');
        let $tabs = $container.find('.js-tab:not([data-tab="' + dataHref + '"])');

        $tabs.hide();
        $tab.fadeIn(250, function() {
          $tab.addClass('is-active');
        });
      });
    },
  };
})(jQuery, window.APP);
