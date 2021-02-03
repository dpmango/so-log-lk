//////////
// CICKS
//////////
(function ($, APP) {
  APP.Plugins.Clicks = {
    init: function () {
      $(document)
        .on('click', '[href="#"]', function (e) {
          e.preventDefault();
        })
        .on('click', '.js-link', function (e) {
          let dataHref = $(this).data('href');
          if (dataHref && dataHref !== '#') {
            e.preventDefault();
            e.stopPropagation();
            window.location.href = dataHref;
          }
        })
        // grid toggler
        .on('click', '.js-show-grid', function () {
          $(this).toggleClass('is-active');
          $('.demo-grid').fadeToggle();
        })
        .on('click', '.ui-pass-eye', function () {
          let $input = $(this).closest('.ui-group').find('input');
          let inputType = $input.attr('type');

          $(this).toggleClass('is-active');

          if (inputType === 'password') {
            $input.attr('type', 'text');
          } else {
            $input.attr('type', 'password');
          }
        });
    },
    destroy: function () {
      // ... code ...
    },
  };
})(jQuery, window.APP);
