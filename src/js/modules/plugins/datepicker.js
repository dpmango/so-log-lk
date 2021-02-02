//////////
// DatePicker
//////////
(function ($, APP) {
  APP.Plugins.DatePicker = {
    init: function (fromPjax) {
      if (!fromPjax) {
        this.clickListeners();
      }
      let $datepicker = $('.js-datepicker');

      if ($datepicker.length === 0) return;

      // initialization
      $datepicker.each(function (i, picker) {
        let $picker = $(picker);

        $picker.datepicker({
          language: 'ru',
          inline: false,
          // range: true,
          dateFormat: 'yyyy-mm-dd',
          firstDay: 1,
          minView: 'days',
        });
      });
    },
    clickListeners: function () {
      let _this = this;
    },
  };
})(jQuery, window.APP);
