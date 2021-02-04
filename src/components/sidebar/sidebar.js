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
      _document
        // when nav hovered - trigger menu linked link
        // and adds hover class to li
        .on('mouseenter', '.js-sidebar-nav a', function () {
          let $link = $(this);
          let $menu = _this.data.menu;
          let dataIndex = $link.parent('li').data('index');

          let $activeMenuLi = $menu.find('li[data-index="' + dataIndex + '"] > a');
          $activeMenuLi.mouseenter();
        })

        .on('mouseenter', '.js-sidebar-menu a', function () {
          let $link = $(this);
          let $container = _this.data.container;
          let $nav = _this.data.nav;
          let $menu = _this.data.menu;
          let $menu2 = $link.parent('li').find('ul');
          let dataIndex = $link.parent('li').data('index');

          if (dataIndex) {
            // trigger only for first level menu (ul)
            // general show elements
            $menu.addClass('is-active');
            $container.addClass('is-active');

            // light up both nav and menu by index (reverse)
            $container.removeClass('is-lvl-down-active');
            $nav.find('li').removeClass('is-hovered');
            $nav.find('li[data-index="' + dataIndex + '"]').addClass('is-hovered');
            $menu.find('li').removeClass('is-active'); // siblings of active (menu)
            $link.parent('li').addClass('is-active'); // cur.active (menu)
            if ($menu2.length > 0) {
              _this.data.container.addClass('is-lvl-down-active');
            }
          }
        })

        // opening sub lvl logic (with throttled listener)
        .on(
          'mouseenter',
          '.js-sidebar-menu a',
          throttle(
            function () {
              let $link = $(this);
              let $menu = _this.data.menu;
              let $menu2 = $link.parent('li').find('ul');

              let $allLvlDowns = $menu.find('li > ul');
              $allLvlDowns.removeClass('is-active').removeClass('force-hide');
              if ($menu2.length > 0) {
                $menu2.addClass('is-active');
              }
            },
            300,
            { leading: false }
          )
        )

        // keep parents active when lvl-down (2 ul) is hovered
        .on('mouseenter', '.js-sidebar-menu .s-menu__lvl-down a', function (e) {
          e.stopPropagation();
          let $link = $(this);
          let $menu = _this.data.menu;
          let dataIndex = $link.closest('ul').closest('ul').data('index');

          let $activeMenuLi = $menu.find('li[data-index="' + dataIndex + '"] > a');
          $activeMenuLi.mouseenter();
        })

        // mobile back menu from lvl down
        .on('click', '.s-menu__mobile-back', function () {
          let $back = $(this);

          $back.closest('ul').removeClass('is-active').addClass('force-hide');
          _this.data.container.removeClass('is-lvl-down-active');
          _this.data.nav.find('li').removeClass('is-hovered');
          _this.data.menu.find('li').removeClass('is-active');
        })

        // cleanup when hovered out global container
        .on('mouseleave', '.sidebar-global-container', function () {
          _this.data.container.removeClass('is-lvl-down-active');
          _this.data.menu.removeClass('is-active');
          _this.data.container.removeClass('is-active');
          _this.data.nav.find('li').removeClass('is-hovered');
          _this.data.menu.find('li').removeClass('is-active');
          _this.data.menu.find('ul ul').removeClass('force-hide');
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
