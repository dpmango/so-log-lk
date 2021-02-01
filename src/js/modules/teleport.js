//////////
// TELEPORT
//////////
(function($, APP) {
  APP.Plugins.Teleport = {
    data: {
      teleports: [],
    },
    init: function() {
      this.getElements();
      this.teleport();
      this.listenResize();
    },
    getElements: function() {
      let _this = this;
      let $teleports = $('.page')
        .last()
        .find('.js-teleport');
      _this.data.teleports = [];

      if ($teleports.length === 0) {
        return;
      }

      $teleports.each(function(i, tp) {
        let $el = $(tp);
        let $target = $('[data-teleport-target=' + $el.data('teleport-to') + ']');
        let conditionMedia = $el.data('teleport-condition').substring(1);
        let conditionPosition = $el.data('teleport-condition').substring(0, 1);

        _this.data.teleports.push({
          el: $el,
          html: $el.html(),
          target: $target,
          conditionMedia: conditionMedia,
          conditionPosition: conditionPosition,
        });
      });
    },

    listenResize: function() {
      _window.on('resize', debounce(this.teleport.bind(this), 100));
    },
    teleport: function() {
      if (this.data.teleports.length === 0) {
        return;
      }

      $.each(this.data.teleports, function(i, obj) {
        if (obj.target && obj.html && obj.conditionPosition) {
          let condition;

          if (obj.conditionPosition === '<') {
            condition = window.innerWidth <= obj.conditionMedia;
          } else if (obj.conditionPosition === '>') {
            condition = window.innerWidth >= obj.conditionMedia;
          }

          if (condition) {
            obj.target.html(obj.html);
            obj.el.html('');
          } else {
            obj.el.html(obj.html);
            obj.target.html('');
          }
        }
      });

      // re-init sliders and other components
      // APP.Plugins.Sliders.reinit();
    },
  };
})(jQuery, window.APP);
