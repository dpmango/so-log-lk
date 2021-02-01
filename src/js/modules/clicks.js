//////////
// CICKS
//////////
(function($, APP) {
  APP.Plugins.Clicks = {
    init: function() {
      $(document)
        .on('click', '[href="#"]', function(e) {
          e.preventDefault();
        })
        .on('click', '[js-link]', function(e) {
          let dataHref = $(this).data('href');
          if (dataHref && dataHref !== '#') {
            e.preventDefault();
            e.stopPropagation();
            Barba.Pjax.goTo(dataHref);
          }
        })
        // prevent going the same link (if barba is connected)
        .on('click', 'a, [js-link]', function(e) {
          let href = $(this).data('href') || $(this).attr('href');
          let path = window.location.pathname;

          if (href === path.slice(1, path.length)) {
            e.preventDefault();
            e.stopPropagation();
          }
        })
        // scroll to section
        .on('click', 'a[href^="#section"]', function() {
          // section scroll
          let el = $(this).attr('href');
          let topTarget = $(el).offset().top;

          // $('body, html').animate({scrollTop: topTarget}, 1000);
          TweenLite.to(window, 1, {
            scrollTo: { y: topTarget, autoKill: false },
            ease: easingSwing,
          });

          return false;
        })
        // grid toggler
        .on('click', '[js-show-grid]', function() {
          $(this).toggleClass('is-active');
          $('.demo-grid').fadeToggle();
        })
        .on('click', '.ui-pass-eye', function() {
          let $input = $(this)
            .closest('.ui-group')
            .find('input');
          let inputType = $input.attr('type');

          $(this).toggleClass('is-active');

          if (inputType === 'password') {
            $input.attr('type', 'text');
          } else {
            $input.attr('type', 'password');
          }
        });
    },
    destroy: function() {
      // ... code ...
    },
  };
})(jQuery, window.APP);
