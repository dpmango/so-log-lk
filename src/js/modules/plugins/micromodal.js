//////////
// Micromodal
//////////
(function ($, APP) {
  APP.Plugins.MicroModal = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.clickListeners();
      }
      // https://micromodal.now.sh
      MicroModal.init({
        onShow: (modal) => {
          APP.Plugins.ScrollBlock.disableScroll();
        },
        onClose: (modal) => {
          APP.Plugins.ScrollBlock.enableScroll();
        },
        openClass: 'is-open',
        disableScroll: false,
        disableFocus: false,
        awaitOpenAnimation: false,
        awaitCloseAnimation: false,
        debugMode: false,
      });
    },
    clickListeners: function () {
      // _document.on('click', '[data-custom-open]', function () {
      //   let modalName = $(this).data('custom-open');
      //   MicroModal.show(modalName);
      // });
      _document.on('click', '[data-micromodal-close]', function () {
        let modalName = $(this).closest('.modal').attr('id');
        MicroModal.close(modalName);
      });
    },
  };
})(jQuery, window.APP);
