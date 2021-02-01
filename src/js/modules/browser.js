//////////
// DETECTORS
//////////
(function($, APP) {
  APP.Browser = function() {
    let methods = {};

    methods.isRetinaDisplay = function() {
      if (window.matchMedia) {
        let mq = window.matchMedia(
          'only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)'
        );
        return (mq && mq.matches) || window.devicePixelRatio > 1;
      }
    };

    methods.isMobile = function() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        return true;
      } else {
        return false;
      }
    };

    methods.isIosDevice = function() {
      if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
        return true;
      } else {
        return false;
      }
    };

    methods.msieversion = function() {
      let ua = window.navigator.userAgent;
      let msie = ua.indexOf('MSIE ');

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
        return true;
      } else {
        return false;
      }
    };

    methods.setBodyTags = function() {
      $('body').addClass('is-ready');

      if (methods.msieversion()) {
        $('body').addClass('is-ie');
      }

      if (methods.isMobile()) {
        $('body').addClass('is-mobile');
      }

      if (methods.isIosDevice()) {
        $('html').addClass('is-ios');
      }
    };

    let data = {
      isIe: methods.msieversion(),
      isMobile: methods.isMobile(),
      isIosDevice: methods.isIosDevice(),
      isRetinaDisplay: methods.isRetinaDisplay(),
    };

    return {
      data: data,
      methods: methods,
    };
  };
})(jQuery, window.APP);
