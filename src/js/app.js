/*********************
 * Initialization file for vendor-free frontend app.js
 *********************/
let APP = window.APP || {};
APP.Dev = APP.Dev || {};
APP.Browser = APP.Browser || {};
APP.Plugins = APP.Plugins || {};
APP.Components = APP.Components || {};

// force scroll to top on initial load
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// shorthand operators
let _window = $(window);
let _document = $(document);
let easingSwing = [0.02, 0.01, 0.47, 1]; // default jQuery easing

(function ($, APP) {
  APP.Initilizer = function () {
    let app = {};

    app.init = function () {
      app.initGlobalPlugins();
      app.initPlugins();
      app.initComponents();
    };

    app.onLoadTrigger = function () {
      APP.Plugins.Preloader.loaded();
    };

    app.refresh = function () {
      APP.Plugins.Sharer.refresh();
      APP.Plugins.Sliders.reinit();
      app.initPlugins(true);
      app.initComponents(true);
    };

    app.destroy = function () {};

    // pjax triggers
    app.newPageReady = function () {
      app.refresh();
    };

    app.transitionCompleted = function () {
      APP.Plugins.AOS.refresh();
      app.onLoadTrigger();
    };

    // Global plugins which must be initialized once
    app.initGlobalPlugins = function () {
      APP.Dev.Credentials.logCredentials();
      APP.Dev.Breakpoint.listenResize();
      APP.Browser().methods.setBodyTags();
      APP.Plugins.LegacySupport.init();
      APP.Plugins.ScrollBlock.listenScroll();
      APP.Plugins.Clicks.init();
      APP.Plugins.AOS.init();
    };

    // Plugins which depends on DOM and page content
    app.initPlugins = function (fromPjax) {
      APP.Plugins.Teleport.init();
      APP.Plugins.MicroModal.init(fromPjax);
      APP.Plugins.Masks.init();
      APP.Plugins.Tabs.init(fromPjax);
      APP.Plugins.TextareaAutoExpand.init();
      APP.Plugins.Validations.init();
      APP.Plugins.LegacySupport.fixImages();
      APP.Plugins.DatePicker.init(fromPjax);
      APP.Plugins.Upload.init(fromPjax);
    };

    // All components from `src/componenets`
    app.initComponents = function (fromPjax) {
      APP.Components.Header.init(fromPjax);
      APP.Components.Sidebar.init(fromPjax);
    };

    return app;
  };

  // a.k.a. ready
  $(function () {
    APP.Initilizer().init();
  });

  $(window).on('load', function () {
    $.ready.then(function () {
      APP.Initilizer().onLoadTrigger();
    });
  });
})(jQuery, window.APP);
