//////////
// Sidebar
//////////
(function ($, APP) {
  APP.Components.Sidebar = {
    data: {
      container: undefined,
      nav: undefined,
      menu: undefined,
    },
    init: function (fromPjax) {
      if (!fromPjax) {
        this.onMount();
        // this.setPositions();
        this.eventListeners();
      }
    },
    onMount: function () {
      let $container = $('.sidebar-global-container');
      let $nav = $('.js-sidebar-nav');
      let $menu = $('.js-sidebar-menu');

      this.data.container = $container;
      this.data.nav = $nav;
      this.data.menu = $menu;
    },
    eventListeners: function () {
      let _this = this;

      // show menu when hovered any nav's
      // add hovered class
      // light up menu by index

      //TODO - add debounced function for mopuseout
      _document
        .on('mouseenter', '.js-sidebar-nav a', function () {
          let $link = $(this);
          let $menu = _this.data.menu;
          let $container = _this.data.container;
          let dataIndex = $link.parent().data('index');
          // console.log({ dataIndex: dataIndex });

          $link.addClass('is-active');
          $menu.addClass('is-active');
          $container.addClass('is-active');

          // light up menu by index
          $menu.find('li').removeClass('is-active');
          $menu.find('li[data-index="' + dataIndex + '"]').addClass('is-active');
        })

        .on('mouseenter', '.js-sidebar-menu a', function () {
          let $link = $(this);
          let $nav = _this.data.nav;
          let $menu = _this.data.menu;
          let $menu2 = $link.parent('li').find('ul');
          let dataIndex = $link.parent().data('index');

          // light up menu by index (reverse)
          $menu.find('li').removeClass('is-active');
          $nav.find('li').removeClass('is-active');
          $nav.find('li[data-index="' + dataIndex + '"]').addClass('is-active');

          $link.addClass('is-active');
        })

        // opening sub lvl logic
        .on(
          'mouseenter',
          '.js-sidebar-menu a',
          throttle(
            function () {
              let $link = $(this);
              let $menu = _this.data.menu;
              let $menu2 = $link.parent('li').find('ul');

              $menu.find('li > ul').removeClass('is-active');
              if ($menu2.length > 0) {
                $menu2.addClass('is-active');
              }
            },
            300,
            { leading: false }
          )
        )
        .on('mouseleave', '.sidebar-global-container', function () {
          _this.data.menu.removeClass('is-active');
          _this.data.container.removeClass('is-active');
          _this.data.nav.find('li').removeClass('is-active');
          _this.data.menu.find('li').removeClass('is-active');
        });
    },
    // setPositions: function() {
    //   // position for 3rd level menu (__lvl-down)
    //   // let $menu = this.data.menu;
    //   // if ($menu.legth === 0) return;
    //   // let $list = $menu.find('.s-menu__lvl-down');
    //   // if ($list.length === 0) return;
    //   // $list.each((i, ul) => {
    //   //   let $ul = $(ul);
    //   //   let $parentLi = $ul.parent('li');
    //   //   let positionTop = $parentLi.offset().top;
    //   //   $ul.css({ paddingTop: positionTop });
    //   // });
    // },
    // listenScroll: function() {
    //   _window.on('scroll', debounce(this.scrollHeaderDebouce.bind(this), 1250, { trailing: true }));
    // },
    // listenResize: function() {
    //   _window.on('resize', debounce(this.getHeaderParams.bind(this), 100));
    // },
  };
})(jQuery, window.APP);
