//////////
// Photoswipe
//////////
(function($, APP) {
  APP.Plugins.Photoswipe = {
    data: {
      pswpItems: [],
      curThumbnail: undefined,
      curSlideIndex: 0,
    },
    init: function(fromPjax) {
      this.clickListeners();
    },
    clickListeners: function() {
      _document.on('click', '.js-open-pswp', function(e) {
        e.preventDefault();

        let $curLink = $(this);

        APP.Plugins.Photoswipe.getThumbData($curLink);
        APP.Plugins.Photoswipe.buildItems($curLink);
        APP.Plugins.Photoswipe.openPSWP($curLink);
      });
    },
    getThumbData: function($originLink) {
      // reset
      this.data.curSlideIndex = 0;
      this.data.curThumbnail = undefined;

      // get swiper slide index
      let $swiper = $originLink.closest('.swiper-container');
      let isPhotoSwiper = $swiper.is('.js-swiper-photos');

      if ($swiper.length > 0) {
        let swiperInst = $swiper[0].swiper;
        if (swiperInst && !isPhotoSwiper) {
          this.data.curSlideIndex = $swiper[0].swiper.realIndex;
        } else {
          this.data.curSlideIndex = $originLink.closest('.swiper-slide').index();
        }
      }

      // get thumbnail for getThumbBoundsFn func
      this.data.curThumbnail = $originLink.find('img');
    },
    buildItems: function($originLink) {
      let _this = this;
      let $elements = $originLink.closest('.swiper-container').find('.js-open-pswp');
      if ($elements.length === 0) return;

      this.data.pswpItems = [];
      $elements.each(function(i, element) {
        let $element = $(element);
        let isSlideDuplicate = $element.closest('.swiper-slide-duplicate').length > 0;
        let targetImg = $element.find('img');

        // swiper dupplicates filter
        if (isSlideDuplicate) return true;

        // push to data array
        if ($element.data('pswp-source') !== undefined) {
          // build from attributes if pswp-source type
          let size = $element.data('size').split('x');

          let pswpObj = {
            src: $element.attr('data-href'),
            msrc: targetImg[0].src, // small image placeholder, main (large) image loads on top of it
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10),
          };

          // optional attributes (caption)
          let $title = $element.find('[data-pswp-title]');
          let $subtitle = $element.find('[data-pswp-subtitle]');
          let $stats = $element.find('[data-pswp-stats]');

          if ($title.length > 0) {
            pswpObj.title = $title.html();
          }

          if ($subtitle.length > 0) {
            pswpObj.subtitle = $subtitle.html();
          }

          if ($stats.length > 0) {
            pswpObj.stats = $stats.html();
          }

          _this.data.pswpItems.push(pswpObj);
        } else {
          if (!targetImg) return true;

          _this.data.pswpItems.push({
            src: targetImg[0].src,
            msrc: targetImg[0].src,
            w: targetImg[0].naturalWidth,
            h: targetImg[0].naturalHeight,
          });
        }
      });
    },
    openPSWP: function($originLink) {
      let $pswpElement = $('.pswp');
      if ($pswpElement.length === 0) return;

      let items = this.data.pswpItems;
      let curThumbnail = this.data.curThumbnail;

      let options = {
        index: this.data.curSlideIndex,
        shareEl: false,
        history: false,
        getThumbBoundsFn: function(index) {
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          let targetThumbnail = curThumbnail;

          if (curThumbnail.closest('.swiper-container').length > 0) {
            let isPhotoSwiper = curThumbnail.closest('.swiper-container').is('.js-swiper-photos');
            if (!isPhotoSwiper) {
              targetThumbnail = curThumbnail
                .closest('.swiper-container')
                .find('.swiper-slide-active img');
            } else {
              targetThumbnail = curThumbnail
                .closest('.swiper-container')
                .find('.swiper-slide')
                .eq(index)
                .find('img');
            }
          }

          let rect = targetThumbnail[0].getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        },
        addCaptionHTMLFn: function(item, captionEl) {
          let captionHtml = '';
          if (item.title) {
            captionHtml = item.title;
          }

          if (item.subtitle) {
            captionHtml += ` ${item.subtitle}`;
          }

          if (item.stats) {
            captionHtml += `<br/>${item.stats}`;
          }

          captionEl.children[0].innerHTML = captionHtml;
          return true;
        },
      };

      // Initializes and opens PhotoSwipe
      let gallery = new PhotoSwipe($pswpElement[0], PhotoSwipeUI_Default, items, options);
      gallery.init();

      // Sync active slide in swiper
      gallery.listen('beforeChange', function() {
        let $swiper = $originLink.closest('.swiper-container');
        if ($swiper.length > 0) {
          let swiper = $swiper[0].swiper;
          if (swiper.params.loop) {
            swiper.slideToLoop(gallery.getCurrentIndex());
          } else {
            swiper.slideTo(gallery.getCurrentIndex());
          }
        }
      });
    },
  };
})(jQuery, window.APP);
